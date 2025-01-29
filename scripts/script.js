// Mobile Menu Toggle
const menuIcon = document.getElementById("menu-icon");
const closeMenu = document.getElementById("close-menu");
const navbar = document.querySelector(".navbar");

// Toggle Menu
menuIcon.addEventListener("click", () => {
  navbar.classList.add("active");
});

// Close Menu
closeMenu.addEventListener("click", () => {
  navbar.classList.remove("active");
});

// Close Menu When a Link is Clicked
navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.onscroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.transform = `scaleX(${progress}%)`;

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
        } else {
            document.querySelector('.navbar a[href*=' + id + ']').classList.remove('active');
        }
    });
}

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

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter projects
    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});