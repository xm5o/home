const firebaseConfig = {
  apiKey: "AIzaSyDSwnuab0yqf6UPcePQSNPXXndwHz-DAjw",
  authDomain: "xd-database.firebaseapp.com",
  projectId: "xd-database",
  storageBucket: "xd-database.firebasestorage.app",
  messagingSenderId: "204951222864",
  appId: "1:204951222864:web:f8c2fb4e00f39896636f55"
};

// Multiple IP services for reliability
const IP_SERVICES = [
  'https://ipapi.co/json/',
  'https://api.ipify.org?format=json',
  'https://httpbin.org/ip',
  'https://api.my-ip.io/ip.json'
];

class UniqueVisitorTracker {
  constructor() {
    this.firestore = null;
    this.app = null;
    this.db = null;
    this.visitorDocRef = null;
    this.geoDocRef = null;
    this.ipDocRef = null;
    this.userIP = null;
    this.deviceFingerprint = null;
    this.initializeFirebase();
  }

  async initializeFirebase() {
    try {
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      const firestoreModule = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      
      this.firestore = firestoreModule;
      this.app = initializeApp(firebaseConfig);
      this.db = firestoreModule.getFirestore(this.app);
      this.visitorDocRef = firestoreModule.doc(this.db, 'visitor_stats', 'main');
      this.geoDocRef = firestoreModule.doc(this.db, 'geo_stats', 'countries');
      this.ipDocRef = firestoreModule.collection(this.db, 'unique_visitors');

      // Generate device fingerprint for extra uniqueness
      this.deviceFingerprint = this.generateDeviceFingerprint();
      
      // Load cached view count from localStorage
      this.loadCachedViewCount();
      
      // Get user IP and process visit
      await this.processUniqueVisit();
      
      // Start real-time updates
      this.startRealTimeUpdates();
      
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      this.showErrorMessage();
    }
  }

  generateDeviceFingerprint() {
    // Create a unique device fingerprint using browser characteristics
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
      navigator.hardwareConcurrency || 'unknown',
      navigator.deviceMemory || 'unknown'
    ].join('|');
    
    // Create a hash from the fingerprint
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  async getUserIP() {
    // Try multiple IP services
    for (const service of IP_SERVICES) {
      try {
        const response = await fetch(service, { 
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) continue;
        const data = await response.json();
        
        // Extract IP from different service formats
        if (service.includes('ipapi.co')) {
          return {
            ip: data.ip,
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'XX',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown'
          };
        } else if (service.includes('ipify')) {
          return { ip: data.ip, country: 'Unknown', countryCode: 'XX', city: 'Unknown', region: 'Unknown' };
        } else if (service.includes('httpbin')) {
          return { ip: data.origin, country: 'Unknown', countryCode: 'XX', city: 'Unknown', region: 'Unknown' };
        } else if (service.includes('my-ip.io')) {
          return { ip: data.ip, country: 'Unknown', countryCode: 'XX', city: 'Unknown', region: 'Unknown' };
        }
      } catch (error) {
        console.warn(`IP service ${service} failed:`, error);
        continue;
      }
    }
    
    // Fallback to device fingerprint if all IP services fail
    return { 
      ip: `fingerprint_${this.deviceFingerprint}`, 
      country: 'Unknown', 
      countryCode: 'XX', 
      city: 'Unknown', 
      region: 'Unknown' 
    };
  }

  async checkIfIPExists(ip, fingerprint) {
    try {
      // Check both IP and device fingerprint for uniqueness
      const ipQuery = this.firestore.query(
        this.ipDocRef,
        this.firestore.where('ip', '==', ip)
      );
      
      const fingerprintQuery = this.firestore.query(
        this.ipDocRef,
        this.firestore.where('fingerprint', '==', fingerprint)
      );
      
      const [ipSnapshot, fingerprintSnapshot] = await Promise.all([
        this.firestore.getDocs(ipQuery),
        this.firestore.getDocs(fingerprintQuery)
      ]);
      
      const ipExists = !ipSnapshot.empty;
      const fingerprintExists = !fingerprintSnapshot.empty;
      
      return {
        exists: ipExists || fingerprintExists,
        ipExists,
        fingerprintExists,
        lastVisit: ipExists ? ipSnapshot.docs[0].data().lastVisit : null
      };
    } catch (error) {
      console.error('Error checking IP existence:', error);
      return { exists: false, ipExists: false, fingerprintExists: false, lastVisit: null };
    }
  }

  async saveUniqueVisitor(ipData) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const now = new Date().toISOString();
      
      const visitorData = {
        ip: ipData.ip,
        fingerprint: this.deviceFingerprint,
        country: ipData.country,
        countryCode: ipData.countryCode,
        city: ipData.city,
        region: ipData.region,
        firstVisit: now,
        lastVisit: now,
        visitDate: today,
        userAgent: navigator.userAgent,
        timestamp: now
      };
      
      // Create a unique document ID combining IP and fingerprint
      const docId = `${ipData.ip}_${this.deviceFingerprint}`.replace(/[^a-zA-Z0-9]/g, '_');
      const docRef = this.firestore.doc(this.ipDocRef, docId);
      
      await this.firestore.setDoc(docRef, visitorData);
      // console.log('✅ Unique visitor saved:', docId);
      
    } catch (error) {
      console.error('Error saving unique visitor:', error);
    }
  }

  async processUniqueVisit() {
    try {
      // Get user IP and location data
      const ipData = await this.getUserIP();
      this.userIP = ipData.ip;
      
      // console.log('🔍 Checking IP:', this.userIP, 'Fingerprint:', this.deviceFingerprint);
      
      // Check if this IP/device already exists
      const existsData = await this.checkIfIPExists(this.userIP, this.deviceFingerprint);
      
      if (existsData.exists) {
        // console.log('🔄 Returning visitor detected - not incrementing count');
        
        // Update last visit time for existing visitor
        try {
          const docId = `${this.userIP}_${this.deviceFingerprint}`.replace(/[^a-zA-Z0-9]/g, '_');
          const docRef = this.firestore.doc(this.ipDocRef, docId);
          await this.firestore.updateDoc(docRef, {
            lastVisit: new Date().toISOString(),
            visitCount: this.firestore.increment(1)
          });
        } catch (updateError) {
          console.warn('Could not update last visit:', updateError);
        }
        
        // Show existing visitor info
        this.showVisitorStatus('returning', existsData.lastVisit);
        
      } else {
        // console.log('🆕 New unique visitor - incrementing count');
        
        // Save new unique visitor
        await this.saveUniqueVisitor(ipData);
        
        // Increment visitor count
        await this.incrementVisitorCount(ipData);
        
        // Show new visitor info
        this.showVisitorStatus('new');
      }
      
    } catch (error) {
      console.error('Error processing unique visit:', error);
      this.showErrorMessage();
    }
  }

  async incrementVisitorCount(ipData) {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Update main visitor stats
      const visitorDoc = await this.firestore.getDoc(this.visitorDocRef);
      
      if (visitorDoc.exists()) {
        await this.firestore.updateDoc(this.visitorDocRef, {
          totalViews: this.firestore.increment(1),
          [`daily.${today}`]: this.firestore.increment(1),
          lastVisitor: {
            timestamp: new Date().toISOString(),
            country: ipData.country,
            city: ipData.city,
            ip: this.userIP.substring(0, 8) + '...' // Partially hide IP for privacy
          },
          lastUpdate: new Date().toISOString()
        });
      } else {
        await this.firestore.setDoc(this.visitorDocRef, {
          totalViews: 1,
          createdAt: new Date().toISOString(),
          daily: { [today]: 1 },
          lastVisitor: {
            timestamp: new Date().toISOString(),
            country: ipData.country,
            city: ipData.city,
            ip: this.userIP.substring(0, 8) + '...'
          },
          lastUpdate: new Date().toISOString()
        });
      }

      // Update geographic statistics
      await this.updateGeoStats(ipData, today);
      
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
    }
  }

  async updateGeoStats(ipData, today) {
    try {
      const geoDoc = await this.firestore.getDoc(this.geoDocRef);
      const countryKey = ipData.countryCode;
      
      if (geoDoc.exists()) {
        const currentData = geoDoc.data();
        const existingCountries = currentData.countries || {};
        const isNewCountry = !existingCountries[countryKey];
        
        const updateData = {
          [`countries.${countryKey}.name`]: ipData.country,
          [`countries.${countryKey}.totalVisits`]: this.firestore.increment(1),
          [`countries.${countryKey}.dailyVisits.${today}`]: this.firestore.increment(1),
          [`countries.${countryKey}.lastVisit`]: new Date().toISOString(),
          lastUpdate: new Date().toISOString()
        };
        
        if (isNewCountry) {
          updateData.totalCountries = this.firestore.increment(1);
        }
        
        await this.firestore.updateDoc(this.geoDocRef, updateData);
      } else {
        await this.firestore.setDoc(this.geoDocRef, {
          countries: {
            [countryKey]: {
              name: ipData.country,
              totalVisits: 1,
              dailyVisits: { [today]: 1 },
              lastVisit: new Date().toISOString()
            }
          },
          totalCountries: 1,
          createdAt: new Date().toISOString(),
          lastUpdate: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Geo stats update failed:', error);
    }
  }

  loadCachedViewCount() {
    try {
      const cachedCount = localStorage.getItem('visitor_count_cache');
      const cachedTime = localStorage.getItem('visitor_count_cache_time');
      
      if (cachedCount && cachedTime) {
        const cacheAge = Date.now() - parseInt(cachedTime);
        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
        
        if (cacheAge < CACHE_DURATION) {
          // Use cached count while loading real data
          const counterElement = document.getElementById('visitorCount');
          if (counterElement) {
            counterElement.textContent = parseInt(cachedCount).toLocaleString();
            counterElement.style.opacity = '0.7'; // Show it's cached
          }
          // console.log('📱 Loaded cached view count:', cachedCount);
        }
      }
    } catch (error) {
      console.warn('Could not load cached count:', error);
    }
  }

  saveCachedViewCount(count) {
    try {
      localStorage.setItem('visitor_count_cache', count.toString());
      localStorage.setItem('visitor_count_cache_time', Date.now().toString());
    } catch (error) {
      console.warn('Could not save cached count:', error);
    }
  }

  startRealTimeUpdates() {
    this.firestore.onSnapshot(this.visitorDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        this.animateCounter(data.totalViews);
        this.updateLastVisitorInfo(data.lastVisitor);
        this.updateTodayStats(data.daily);
        
        // Cache the current count
        this.saveCachedViewCount(data.totalViews);
      }
    }, (error) => {
      console.error('Real-time listener error:', error);
    });

    this.firestore.onSnapshot(this.geoDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        this.updateGeoDisplay(data);
      }
    });
  }

  animateCounter(targetNumber) {
    const counterElement = document.getElementById('visitorCount');
    if (!counterElement) return;

    // Remove cache opacity
    counterElement.style.opacity = '1';
    
    const startNumber = parseInt(counterElement.textContent.replace(/,/g, '')) || 0;
    const duration = 1000;
    const increment = (targetNumber - startNumber) / (duration / 16);

    let current = startNumber;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        clearInterval(timer);
        current = targetNumber;
      }
      counterElement.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  updateLastVisitorInfo(lastVisitor) {
    const lastVisitorElement = document.getElementById('lastVisitor');
    if (lastVisitorElement && lastVisitor) {
      const timeAgo = this.getTimeAgo(new Date(lastVisitor.timestamp));
      lastVisitorElement.innerHTML = `
        <small>Latest: ${lastVisitor.city}, ${lastVisitor.country} (${timeAgo}) [${lastVisitor.ip}]</small>
      `;
    }
  }

  updateTodayStats(dailyData) {
    const today = new Date().toISOString().split('T')[0];
    const todayElement = document.getElementById('todayVisits');
    if (todayElement && dailyData) {
      todayElement.textContent = (dailyData[today] || 0).toLocaleString();
    }
  }

  updateGeoDisplay(geoData) {
    const geoElement = document.getElementById('geoStats');
    if (!geoElement || !geoData.countries) return;

    const sortedCountries = Object.entries(geoData.countries)
      .map(([code, data]) => ({ code, ...data }))
      .sort((a, b) => b.totalVisits - a.totalVisits)
      .slice(0, 10);

    const totalCountriesElement = document.getElementById('totalCountries');
    if (totalCountriesElement) {
      totalCountriesElement.textContent = geoData.totalCountries || 0;
    }

    geoElement.innerHTML = `
      <div class="geo-header">
        <h3>🌍 Top Countries</h3>
      </div>
      <div class="country-list">
        ${sortedCountries.map((country, index) => `
          <div class="country-item">
            <span class="rank">#${index + 1}</span>
            <span class="flag">${this.getCountryFlag(country.code)}</span>
            <span class="country-name">${country.name}</span>
            <span class="visit-count">${country.totalVisits.toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  showVisitorStatus(type, lastVisit = null) {
    const statusElement = document.getElementById('visitorStatus');
    if (statusElement) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      
      if (type === 'new') {
        statusElement.innerHTML = `
          <div style="color: #4ade80; font-weight: bold;">
            🆕 New Unique Visitor! Welcome! (${timeStr})
          </div>
        `;
      } else {
        const lastVisitTime = lastVisit ? this.getTimeAgo(new Date(lastVisit)) : 'unknown';
        statusElement.innerHTML = `
          <div style="color: #fbbf24; font-weight: bold;">
            🔄 Welcome Back! Last visit: ${lastVisitTime} (${timeStr})
          </div>
        `;
      }
    }
  }

  getCountryFlag(countryCode) {
    if (countryCode === 'XX' || !countryCode) return '🏳️';
    return countryCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(127397 + char.charCodeAt())
    );
  }

  getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  showErrorMessage() {
    const counterElement = document.getElementById('visitorCount');
    if (counterElement) {
      counterElement.textContent = "Connection Error";
      counterElement.style.color = '#ef4444';
    }
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new UniqueVisitorTracker();
});