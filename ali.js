document.addEventListener("DOMContentLoaded", function () {
  const eduSection = document.querySelector('.education-section');
  const eduBlocks = document.querySelectorAll('.edu-block');
  const eduLines = document.querySelectorAll('.edu-line');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  function playEducationAnimation() {
    eduBlocks.forEach(el => el.style.animation = '');
    eduLines.forEach(el => el.style.animation = '');
    // Force reflow for restart
    void eduBlocks[0].offsetWidth;
    eduBlocks.forEach((el, i) => {
      el.style.animation = `fadeInUp 1s both`;
      el.style.animationDelay = `${0.2 + i * 0.9}s`;
    });
    eduLines.forEach((el, i) => {
      el.style.animation = `growLine 0.7s forwards`;
      el.style.animationDelay = `${0.7 + i * 0.9}s`;
    });
  }

  function resetEducationAnimation() {
    eduBlocks.forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
    });
    eduLines.forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = 0;
      el.style.height = '0';
    });
  }

  function handleScroll() {
    if (isInViewport(eduSection)) {
      playEducationAnimation();
    } else {
      resetEducationAnimation();
    }
  }

  // Initial reset
  resetEducationAnimation();

  window.addEventListener('scroll', handleScroll, { passive: true });
});

// Skills animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll('.skill-item');
  function showSkillsOnScroll() {
    skillItems.forEach((item, idx) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => {
          item.classList.add('visible');
        }, idx * 120); // Staggered animation
      } else {
        item.classList.remove('visible');
      }
    });
  }
  window.addEventListener('scroll', showSkillsOnScroll, { passive: true });
  showSkillsOnScroll();
});

// Smooth scroll for all anchor links with #
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Back to Top button show/hide
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
});

// Highlight nav link on scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('section, .show-section, .education-section, .skills-section, .projects-section, .contact-section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  window.addEventListener('scroll', function () {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
});

// Show success message after form submit (Formspree)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          form.insertAdjacentHTML('afterend', '<div class="form-success">Thank you! Your message has been sent.</div>');
        } else {
          form.insertAdjacentHTML('afterend', '<div class="form-error">Oops! Something went wrong.</div>');
        }
      }).catch(() => {
        form.insertAdjacentHTML('afterend', '<div class="form-error">Oops! Something went wrong.</div>');
      });
    });
  }
});