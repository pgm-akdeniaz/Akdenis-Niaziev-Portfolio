document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.nav__theme-icon');
  const backToTop = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('.about, .skills, .projects, .resume, .contact');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('nav__hamburger--active');
    mobileMenu.classList.toggle('mobile-menu--active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });

      hamburger.classList.remove('nav__hamburger--active');
      mobileMenu.classList.remove('mobile-menu--active');
    });
  });

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeIcon.src = isDark ? './assets/icons/sun.png' : './assets/icons/moon.png';
  });

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('back-to-top--visible', window.scrollY > 300);
    }
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        section.classList.add('section--visible');
      }
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      section.classList.add('section--visible');
    }
  });
});
