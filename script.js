// FSociety Computer Services — script.js
'use strict';

(function () {

  // ── HAMBURGER / MOBILE MENU ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }, { passive: true });

    // Close on mobile nav link click
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── STICKY HEADER ────────────────────────────────────────────────
  const header = document.getElementById('header');
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (header) {
          header.classList.toggle('scrolled', window.scrollY > 50);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ── SMOOTH SCROLL ─────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 64;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── CONTACT FORM ──────────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('#c-name').value.trim();
      const email = form.querySelector('#c-email').value.trim();
      const msg = form.querySelector('#c-msg').value.trim();

      // Basic validation
      if (name.length < 2) {
        showStatus('error', '> ERROR: Please enter your full name.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('error', '> ERROR: Please enter a valid email address.');
        return;
      }
      if (msg.length < 10) {
        showStatus('error', '> ERROR: Message too short. Please describe your issue.');
        return;
      }

      // Simulate send (no backend endpoint for contact form)
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = '> SENDING...';

      setTimeout(function () {
        showStatus('success', '> TRANSMISSION SUCCESSFUL. We\'ll be in touch within 24 hours.');
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }, 800);
    });
  }

  function showStatus(type, msg) {
    status.className = 'form-status ' + type;
    status.textContent = msg;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

})();
