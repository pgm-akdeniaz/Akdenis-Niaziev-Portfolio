document.addEventListener("DOMContentLoaded", () => {
  /* HAMBURGER ICON */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    hamburger.classList.toggle("nav__hamburger--active");
    mobileMenu.classList.toggle("mobile-menu--active");
  });

  const mobileLinks = document.querySelectorAll(".mobile-menu__link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("nav__hamburger--active");
      mobileMenu.classList.remove("mobile-menu--active");
    });
  });

  document.addEventListener("click", (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    const isMenuOpen = hamburger.getAttribute("aria-expanded") === "true";
    if (!isClickInsideMenu && !isClickOnHamburger && isMenuOpen) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("nav__hamburger--active");
      mobileMenu.classList.remove("mobile-menu--active");
    }
  });

  /* PREVENT SLUG ON URL */
  const navLinks = document.querySelectorAll(".nav__link, .mobile-menu__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* TOGGLE THEME MODE */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".nav__theme-icon");

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeIcon.src = isDark
      ? "./assets/icons/sun.png"
      : "./assets/icons/moon.png";
  });

  /* SKILLS TOOLTIP ON MOBILE */
  const skillIcons = document.querySelectorAll(".skills__icon");
  let activeTooltip = null;

  skillIcons.forEach((icon) => {
    icon.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const tooltip = icon.nextElementSibling;
      if (activeTooltip && activeTooltip !== tooltip) {
        activeTooltip.classList.remove("skills__item-text--active");
      }
      if (tooltip) {
        tooltip.classList.toggle("skills__item-text--active");
        activeTooltip = tooltip.classList.contains("skills__item-text--active") ? tooltip : null;
      }
    });
  });

  /* HERO SUBTITLE ANIMATION */
  const subtitle = document.querySelector(".hero__subtitle");
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.innerHTML = text
      .split("")
      .map((char, index) => `<span class="hero__subtitle-char" style="--char-index: ${index}">${char}</span>`)
      .join("");
  }

  /* SECTION SCROLL ANIMATION */
  const sections = document.querySelectorAll(".about, .skills, .projects, .resume, .contact");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section--visible");
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.classList.add("section--hidden");
    observer.observe(section);
  });

  /* CONTACT FORM */
  document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("form-status");
    const formData = new FormData(form);
    status.textContent = "";
    status.style.color = "";
    if (form._honeypot.value !== "") {
      status.textContent = "Submission blocked as spam.";
      status.style.color = "red";
      return;
    }
    const name = formData.get("name").trim();
    const email = formData.get("_replyto").trim();
    const phone = formData.get("phone").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();
    const phoneRegex = /^\+?[0-9\s\-]{7,20}$/;
    if (name.length < 2) {
      status.textContent = "Please enter a valid full name.";
      status.style.color = "red";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "red";
      return;
    }
    if (!phoneRegex.test(phone)) {
      status.textContent = "Please enter a valid phone number with country code.";
      status.style.color = "red";
      return;
    }
    if (subject.length < 3) {
      status.textContent = "Please provide a meaningful subject.";
      status.style.color = "red";
      return;
    }
    if (message.length < 10) {
      status.textContent = "Message should be at least 10 characters long.";
      status.style.color = "red";
      return;
    }
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        form.reset();
        status.textContent = "Thank you! Your message has been sent successfully.";
        status.style.color = "green";
      } else {
        const data = await response.json();
        status.textContent = data?.errors?.[0]?.message || "Submission failed. Try again later.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again later.";
      status.style.color = "red";
    }
  });
});