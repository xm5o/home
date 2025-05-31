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

// Home Section Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Typing Effect
  const roles = ["Web Developer", "Gamer", "Bot Designer", "FnF Charts and Coder", "Fnf modcharts"];
  const roleElement = document.querySelector('.animated-role');
  let currentRole = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = roles[currentRole];

    if (!isDeleting) {
      roleElement.textContent = currentText.slice(0, charIndex++);
      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      roleElement.textContent = currentText.slice(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 150);
  }
  typeEffect();

  // Profile Image Hover Effect
  const profileImg = document.querySelector('.profile-img');
  profileImg.addEventListener('mousemove', (e) => {
    const rect = profileImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    profileImg.style.transform = `
          perspective(1000px)
          rotateX(${(y - rect.height / 2) / 8}deg)
          rotateY(${-(x - rect.width / 2) / 8}deg)
      `;
  });

  profileImg.addEventListener('mouseleave', () => {
    profileImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

  // Social Links Particle Effect
  const socialLinks = document.querySelectorAll('.social-btn');
  socialLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const particles = document.createElement('div');
      particles.className = 'particle';
      particles.style.left = `${e.offsetX}px`;
      particles.style.top = `${e.offsetY}px`;
      link.appendChild(particles);

      setTimeout(() => particles.remove(), 1000);
    });
  });

  // Smooth Scroll to Projects
  document.querySelector('.projects-cta').addEventListener('click', (e) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects');
    projectsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Loading Animation Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.home-content > *').forEach(el => observer.observe(el));
});

// Background Particles
class ParticleCanvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];

    this.init();
  }

  init() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    document.body.appendChild(this.canvas);

    this.resize();
    window.addEventListener('resize', this.resize.bind(this));

    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${window.getComputedStyle(document.documentElement)
        .getPropertyValue('--main-color-rgb')}, 0.2)`;
      this.ctx.fill();

      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x > this.width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > this.height) particle.dy *= -1;
    });

    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize particle background
new ParticleCanvas();

document.addEventListener('DOMContentLoaded', function () {
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

document.addEventListener('DOMContentLoaded', function () {
  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Initialize with all projects visible
  filterProjects('all');

  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter value
      const filterValue = this.getAttribute('data-filter');

      // Filter projects
      filterProjects(filterValue);
    });
  });

  function filterProjects(category) {
    // Track if we're using reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      // Reset animations if animations are enabled
      if (!prefersReducedMotion) {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
      }

      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';

        // Only animate if animations are enabled
        if (!prefersReducedMotion) {
          card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          card.style.opacity = 1;
        }
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Scroll reveal animation using Intersection Observer
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
      observer.observe(card);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    projectCards.forEach(card => {
      card.classList.add('visible');
      card.style.opacity = 1;
    });
  }

  // Touch device detection for better hover effects
  function isTouchDevice() {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');

    // Add touch-friendly interaction for project cards
    projectCards.forEach(card => {
      card.addEventListener('touchstart', function () {
        // Remove active class from all cards
        projectCards.forEach(c => c.classList.remove('touch-active'));
        // Add active class to current card
        this.classList.add('touch-active');
      });
    });
  }

  // Adjust layout based on screen size
  function adjustLayout() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 576) {
      // Single column layout for mobile
      document.querySelectorAll('.project-actions').forEach(actions => {
        actions.style.flexDirection = 'column';
      });
    } else {
      // Reset for larger screens
      document.querySelectorAll('.project-actions').forEach(actions => {
        actions.style.flexDirection = 'row';
      });
    }
  }

  // Initial adjustment
  adjustLayout();

  // Listen for window resize
  window.addEventListener('resize', adjustLayout);
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

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Check if current item is already active
      const isActive = item.classList.contains('active');

      // Close all items first
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // If clicked item wasn't active before, make it active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// const SERVER_ID = '1312621353811050536';
// const WIDGET_URL = `https://discord.com/api/guilds/${SERVER_ID}/widget.json`;
// const SERVER_ICON_URL = `https://cdn.discordapp.com/icons/${SERVER_ID}/`;

// async function loadServerInfo() {
//   try {
//     const response = await fetch(WIDGET_URL);
//     if (!response.ok) throw new Error('Failed to fetch server data');
//     const widgetData = await response.json();

//     // Update server information
//     document.getElementById('serverName').textContent = widgetData.name;
//     document.getElementById('onlineCount').textContent = widgetData.presence_count;

//     // Get actual member count from different endpoint
//     const membersResponse = await fetch(WIDGET_URL.replace('widget.json', ''));
//     const membersData = await membersResponse.json();
//     document.getElementById('memberCount').textContent = membersData.approximate_member_count || 'N/A';

//     // Server icon handling
//     const iconImg = document.getElementById('serverIcon');
//     if (widgetData.icon) {
//       iconImg.src = `https://cdn.discordapp.com/icons/${SERVER_ID}/${widgetData.icon}.png?size=256`;
//       iconImg.onerror = () => {
//         iconImg.src = 'placeholder-server-icon.png';
//       };
//     } else {
//       iconImg.src = 'placeholder-server-icon.png';
//     }

//     // Update join button
//     const joinButton = document.getElementById('joinButton');
//     if (widgetData.instant_invite) {
//       joinButton.href = widgetData.instant_invite;
//       joinButton.disabled = false;
//     } else {
//       joinButton.disabled = true;
//       joinButton.textContent = 'Invite Closed';
//     }

//   } catch (error) {
//     console.error('Error loading server info:', error);
//     document.querySelector('.custom-widget').innerHTML = `
//             <div class="widget-error">
//                 Server information currently unavailable
//             </div>
//         `;
//   }
// }

// // Initial load
// loadServerInfo();
// // Refresh every 2 minutes
// setInterval(loadServerInfo, 120000);

// // Server icon hover effect
// document.getElementById('serverIcon').addEventListener('mouseover', function () {
//   this.style.transform = 'rotate(5deg) scale(1.05)';
// });
// document.getElementById('serverIcon').addEventListener('mouseout', function () {
//   this.style.transform = 'none';
// });

// Add interactive effects and animations
document.addEventListener('DOMContentLoaded', function () {
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.contact-card, .primary-contact');

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize elements
  const elements = document.querySelectorAll('.contact-card, .primary-contact');
  elements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all 0.6s ease ${index * 0.1}s`;
  });

  // Add scroll listener
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Check on load

  // Add click tracking
  const discordBtn = document.querySelector('.discord-btn');
  const socialLinks = document.querySelectorAll('.social-icon-link');

  discordBtn.addEventListener('click', function () {
    console.log('Discord contact initiated');
  });

  // Add hover effects to feature items
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add particle effect on Discord button click
  discordBtn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const particle = document.createElement('div');
    particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 6px;
                    height: 6px;
                    background: white;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particle-float 1s forwards;
                `;

    this.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  });

  // Add CSS for particle animation
  const style = document.createElement('style');
  style.textContent = `
                @keyframes particle-float {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-20px) scale(0);
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(style);
});