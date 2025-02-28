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