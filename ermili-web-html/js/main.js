(function () {
  'use strict';

  // Custom cursor dot (brand signature)
  const cursorDot = document.getElementById('cursorDot');
  if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('cursor-ready');
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  const header = document.getElementById('header');
  const darkSections = document.querySelectorAll('.section--dark, .featured-card, .meet-card');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const DOCK_THRESHOLD = 80;
  let wasDocked = false;

  const closeMobileNav = () => {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const updateHeader = () => {
    const scrollY = window.scrollY;
    const isDocked = scrollY > DOCK_THRESHOLD;

    if (isDocked !== wasDocked) {
      closeMobileNav();
      wasDocked = isDocked;
    }

    header.classList.toggle('scrolled', scrollY > 20);
    header.classList.toggle('header--docked', isDocked);

    const probeY = isDocked ? window.innerHeight - varHeaderHDocked() : varHeaderH();
    let onDark = false;

    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < probeY && rect.bottom > probeY) {
        onDark = true;
      }
    });

    const featured = document.querySelector('.featured');
    if (featured) {
      const rect = featured.getBoundingClientRect();
      if (rect.top < probeY && rect.bottom > probeY) onDark = true;
    }

    header.classList.toggle('on-dark', onDark);
  };

  function varHeaderH() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 88;
  }

  function varHeaderHDocked() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h-docked'), 10) || 88;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile nav
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });

  // FAQ — close others when one opens (accordion behavior)
  const accordion = document.getElementById('faqAccordion');
  if (accordion) {
    accordion.querySelectorAll('.accordion-item').forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        accordion.querySelectorAll('.accordion-item').forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.className = 'form-status error';
      status.textContent = 'Please fill in all fields.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.className = 'form-status error';
      status.textContent = 'Please enter a valid email address.';
      return;
    }

    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@ermili.dev?subject=${subject}&body=${body}`;

    status.className = 'form-status success';
    status.textContent = 'Opening your email client…';
    form.reset();
  });
})();
