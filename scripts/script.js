const menuIcon = document.getElementById("menu-icon");
const closeMenu = document.getElementById("close-menu");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  navbar.classList.remove("active");
});

navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

// const scrollProgress = document.createElement('div');
// scrollProgress.className = 'scroll-progress';
// document.body.appendChild(scrollProgress);

// window.onscroll = () => {
//     const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
//     const progress = (window.pageYOffset / totalHeight) * 100;
//     scrollProgress.style.transform = `scaleX(${progress}%)`;

//     const sections = document.querySelectorAll('section');
//     sections.forEach(sec => {
//         const top = window.scrollY;
//         const offset = sec.offsetTop - 150;
//         const height = sec.offsetHeight;
//         const id = sec.getAttribute('id');
        
//         if(top >= offset && top < offset + height) {
//             document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
//         } else {
//             document.querySelector('.navbar a[href*=' + id + ']').classList.remove('active');
//         }
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
    // async function fetchDiscordStats() {
    //     try {
    //         const serverId = 'F8ekFRzRaN';
    //         const response = await fetch(`https://discord.me/api/v1/servers/${serverId}`);
    //         const data = await response.json();

    //         document.getElementById('total-members').textContent = data.members || 'N/A';
    //         document.getElementById('active-discussions').textContent = data.online || 'N/A';
    //         document.getElementById('weekly-growth').textContent = `${(data.growth || 0).toFixed(1)}%`;
    //     } catch (error) {
    //         console.error('Failed to fetch Discord stats:', error);
    //     }
    // }

//     document.getElementById('total-members').textContent = '';
//     document.getElementById('active-discussions').textContent = '';
//     document.getElementById('weekly-growth').textContent = '';

//     fetchDiscordStats();
// });

// const themeToggle = document.createElement('div');
// themeToggle.className = 'theme-toggle';
// themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
// document.body.appendChild(themeToggle);

// themeToggle.onclick = () => {
//     document.body.setAttribute('data-theme',
//         document.body.getAttribute('data-theme') === 'midnight' ? 'dark' : 'midnight'
//     );
//     themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'midnight' 
//         ? '<i class="bx bx-moon"></i>' 
//         : '<i class="bx bx-sun"></i>';
// }

document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const value = bar.getAttribute('data-value');
    setTimeout(() => {
      bar.style.width = value + '%';
    }, 300);
  });
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId + '-tab').classList.add('active');
    });
  });
});

const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills-section')) {
                animateSkills();
            }
        }
    });
});

document.querySelectorAll('.service-box, .skill-bar, .about-content').forEach(el => observer.observe(el));

const contactForm = document.querySelector('.contact form');
contactForm.onsubmit = (e) => {
    e.preventDefault();

    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = 'Message sent successfully!';
    contactForm.appendChild(successMsg);
    
    setTimeout(() => successMsg.remove(), 3000);
    contactForm.reset();
}

// Project Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    document.querySelectorAll('.filter-btn').forEach(btn => 
      btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// document.querySelectorAll('.feature').forEach(feature => {
//   feature.addEventListener('mouseenter', () => {
//     feature.style.transform = 'scale(1.1)';
//     feature.style.color = '#fad0a3';
//   });
  
//   feature.addEventListener('mouseleave', () => {
//     feature.style.transform = 'scale(1)';
//     feature.style.color = '#bc7f4c';
//   });
// });

// ripple effect
// document.querySelector('.invite-button').addEventListener('click', function(e) {
//   let x = e.clientX - e.target.offsetLeft;
//   let y = e.clientY - e.target.offsetTop;
  
//   let ripple = document.createElement('span');
//   ripple.style.left = x + 'px';
//   ripple.style.top = y + 'px';
  
//   this.appendChild(ripple);
  
//   setTimeout(() => {
//     ripple.remove();
//   }, 1000);
// });

// Wrap the code in a function to avoid global scope pollution
(function() {
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Animation for stat numbers
  function animateCount(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const increment = Math.ceil(targetValue / (duration / 16));
    let currentValue = startValue;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        clearInterval(timer);
        currentValue = targetValue;
      }
      element.textContent = currentValue;
    }, 16);
  }
  
  // Growth chart
  function createGrowthChart() {
    const canvas = document.getElementById('growthChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Make canvas responsive
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Creating sample growth data points
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#5865F2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const points = [
      {x: 2, y: height * 1.05},
      {x: width * 0.3, y: height * 0.6},
      {x: width * 0.5, y: height * 0.7},
      {x: width * 0.7, y: height * 0.5},
      {x: width * 0.9, y: height * 0.4},
      {x: width, y: height * 0.2}
    ];
    
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    
    // Add gradient under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(88, 101, 242, 0.3)');
    gradient.addColorStop(1, 'rgba(88, 101, 242, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }
  
  // Activity chart
  function createActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Make canvas responsive
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw x-axis and y-axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Draw horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height / 5 * i);
      ctx.lineTo(width, height / 5 * i);
      ctx.stroke();
    }
    
    // Draw vertical grid lines (days of week)
    for (let i = 0; i <= 7; i++) {
      ctx.beginPath();
      ctx.moveTo(width / 7 * i, 0);
      ctx.lineTo(width / 7 * i, height);
      ctx.stroke();
    }
    
    // Days labels
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < 7; i++) {
      ctx.fillText(days[i], width / 7 * i + width / 14, height - 5);
    }
    
    // Message activity data (random)
    const messageData = [
      height * 0.2,
      height * 0.0,
      height * 0.2,
      height * 0.1,
      height * 0.4,
      height * 0.5,
      height * 0.5
    ];
    
    // Voice activity data (random)
    const voiceData = [
      height * 0,
      height * 0,
      height * 0,
      height * 0,
      height * 0,
      height * 0,
      height * 0
    ];
    
    // Draw message activity
    ctx.strokeStyle = 'rgba(88, 101, 242, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < 7; i++) {
      const x = width / 7 * i + width / 14;
      const y = height - messageData[i];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw message data points
    ctx.fillStyle = 'rgba(88, 101, 242, 1)';
    for (let i = 0; i < 7; i++) {
      const x = width / 7 * i + width / 14;
      const y = height - messageData[i];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw voice activity
    ctx.strokeStyle = 'rgba(235, 69, 158, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < 7; i++) {
      const x = width / 7 * i + width / 14;
      const y = height - voiceData[i];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw voice data points
    ctx.fillStyle = 'rgba(235, 69, 158, 1)';
    for (let i = 0; i < 7; i++) {
      const x = width / 7 * i + width / 14;
      const y = height - voiceData[i];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Animate chat messages
  function animateChatMessages() {
    const messages = document.querySelectorAll('.message');
    if (!messages.length) return;
    
    messages.forEach((message) => {
      message.style.opacity = '0';
      message.style.transform = 'translateY(20px)';
    });
  }
  
  // Adjust layout for mobile
  function adjustMobileLayout() {
    if (window.innerWidth <= 768) {
      // Convert stat cards to horizontal layout
      const statCards = document.querySelectorAll('.stat-card');
      statCards.forEach(card => {
        if (!card.querySelector('.stat-card-content')) {
          const content = document.createElement('div');
          content.className = 'stat-card-content';
          
          // Move all elements except the icon into the content div
          Array.from(card.children).forEach(child => {
            if (!child.classList.contains('bx')) {
              content.appendChild(child);
            }
          });
          
          card.appendChild(content);
        }
      });
      
      // Convert features to horizontal layout
      const features = document.querySelectorAll('.feature');
      features.forEach(feature => {
        if (!feature.querySelector('.feature-content')) {
          const content = document.createElement('div');
          content.className = 'feature-content';
          
          // Move all elements except the icon into the content div
          Array.from(feature.children).forEach(child => {
            if (!child.classList.contains('bx')) {
              content.appendChild(child);
            }
          });
          
          feature.appendChild(content);
        }
      });
    }
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Adjust layout for mobile
    adjustMobileLayout();
    
    // Initial animation of elements in viewport
    const communitySection = document.querySelector('.discord-community');
    if (isInViewport(communitySection)) {
      animateCount('memberCount', 53, 1500);
      animateCount('discussionCount', 1243, 2000);
      createGrowthChart();
      createActivityChart();
      animateChatMessages();
    }
    
    // Create observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount('memberCount', 53, 1500);
          animateCount('discussionCount', 1243, 2000);
          createGrowthChart();
          createActivityChart();
          animateChatMessages();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe the community section
    observer.observe(communitySection);
    
    // Redraw charts on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        createGrowthChart();
        createActivityChart();
        adjustMobileLayout();
      }, 250);
    });
    
    // Add hover effects for card elements
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--bg-color)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--bg-color)';
      });
    });
  });
})();