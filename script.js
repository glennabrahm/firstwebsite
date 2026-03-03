/**
 * script.js
 * Personal Portfolio - Glenn Abraham
 * Vanilla JS: Navbar, Smooth Scroll, Fade-in, Skill Bars, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     1. NAVBAR — scroll effect & active link
  ============================================= */
  const nav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Scroll-to-top button
    const btn = document.getElementById('scrollTop');
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* =============================================
     2. SCROLL-TO-TOP BUTTON
  ============================================= */
  const scrollTopBtn = document.getElementById('scrollTop');
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =============================================
     3. SMOOTH SCROLL for navbar links
  ============================================= */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      if (target.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) {
          const offset = 72;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });

          // Close mobile menu
          const toggler = document.querySelector('.navbar-toggler');
          const collapse = document.getElementById('navbarNav');
          if (collapse.classList.contains('show') && toggler) {
            toggler.click();
          }
        }
      }
    });
  });

  /* =============================================
     4. FADE-IN ON SCROLL
  ============================================= */
  const fadeEls = document.querySelectorAll('.fade-in-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* =============================================
     5. SKILL BARS ANIMATION
  ============================================= */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = targetWidth; }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* =============================================
     6. CONTACT FORM VALIDATION
  ============================================= */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'formName',    errId: 'errName',    rule: v => v.trim().length >= 2,       msg: 'Nama minimal 2 karakter.' },
        { id: 'formEmail',   errId: 'errEmail',   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Format email tidak valid.' },
        { id: 'formMessage', errId: 'errMessage', rule: v => v.trim().length >= 10,      msg: 'Pesan minimal 10 karakter.' }
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const errEl = document.getElementById(f.errId);
        const value = input.value;

        if (!f.rule(value)) {
          input.classList.add('error');
          errEl.textContent = f.msg;
          errEl.style.display = 'block';
          valid = false;
        } else {
          input.classList.remove('error');
          errEl.style.display = 'none';
        }
      });

      if (valid) {
        const successEl = document.getElementById('formSuccess');
        const submitBtn = document.getElementById('submitBtn');

        // Simulate sending
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
          successEl.style.display = 'flex';
          form.reset();
          submitBtn.textContent = 'Kirim Pesan';
          submitBtn.disabled = false;

          setTimeout(() => { successEl.style.display = 'none'; }, 5000);
        }, 1000);
      }
    });

    // Live clear error on input
    ['formName', 'formEmail', 'formMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.classList.remove('error');
          const errEl = document.getElementById('err' + id.replace('form', ''));
          if (errEl) errEl.style.display = 'none';
        });
      }
    });
  }

  /* =============================================
     7. TYPED TEXT EFFECT (Hero)
  ============================================= */
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const words = ['Mahasiswa Informatika', 'AI Enthusiast', 'Programmer', 'Educator'];
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
      const current = words[wordIdx];
      if (!deleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }

    type();
  }

  /* =============================================
     8. HERO entrance animation
  ============================================= */
  const heroEls = document.querySelectorAll('.hero-animate');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });

});
