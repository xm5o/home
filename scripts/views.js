// Firebase-powered Visitor Counter (Browser-Compatible Version)
const firebaseConfig = {
  apiKey: "AIzaSyDSwnuab0yqf6UPcePQSNPXXndwHz-DAjw",
  authDomain: "xd-database.firebaseapp.com",
  projectId: "xd-database",
  storageBucket: "xd-database.firebasestorage.app",
  messagingSenderId: "204951222864",
  appId: "1:204951222864:web:f8c2fb4e00f39896636f55"
};

class FirebaseVisitorCounter {
  constructor() {
    this.firestore = null;
    this.functions = null;
    this.initializeFirebase();
  }

  async initializeFirebase() {
    try {
      // Dynamically import Firebase modules
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      const firestoreModule = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      
      // Store Firestore functions in class properties
      this.firestore = firestoreModule;
      this.app = initializeApp(firebaseConfig);
      this.db = firestoreModule.getFirestore(this.app);
      this.docRef = firestoreModule.doc(this.db, 'visitor_stats', 'main');

      await this.updateVisitorCount();
      this.startRealTimeUpdates();
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      this.showErrorMessage();
    }
  }

  async updateVisitorCount() {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const docSnap = await this.firestore.getDoc(this.docRef);
      
      if (docSnap.exists()) {
        await this.firestore.updateDoc(this.docRef, {
          totalViews: this.firestore.increment(1),
          [`daily.${today}`]: this.firestore.increment(1)
        });
      } else {
        await this.firestore.setDoc(this.docRef, {
          totalViews: 1,
          createdAt: new Date().toISOString(),
          daily: { [today]: 1 }
        });
      }
    } catch (error) {
      console.error('Count update failed:', error);
    }
  }

  startRealTimeUpdates() {
    this.firestore.onSnapshot(this.docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        this.animateCounter(data.totalViews);
      }
    });
  }

  animateCounter(targetNumber) {
    const counterElement = document.getElementById('visitorCount');
    if (!counterElement) return;

    const startNumber = parseInt(counterElement.textContent) || 0;
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

  showErrorMessage() {
    const counterElement = document.getElementById('visitorCount');
    if (counterElement) {
      counterElement.textContent = "Online!";
    }
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new FirebaseVisitorCounter();
});