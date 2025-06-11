// home.js
document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Typing Effect
  const roles = ["Web Developer", "Gamer", "Bot Designer", "FnF Charter and Coder", "Fnf modcharter"];
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