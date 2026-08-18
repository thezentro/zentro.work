/* ============================================================
   ZENTRO WORKS — MAIN SCRIPT
   HTML + CSS + Vanilla JavaScript ONLY
   ============================================================ */

'use strict';

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    "https://bevqoygaisgffcgxpznb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldnFveWdhaXNnZmZjZ3hwem5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODY3MTAsImV4cCI6MjEwMTI2MjcxMH0.VHE93eIgqjL8XtzuIpSLVSyh4bAfEaSmehA-hpxYi0c"
);

/* ------------------------------------------------------------
   1. NAVIGATION — scroll + mobile toggle
   ------------------------------------------------------------ */
(function initNav() {
  const nav      = document.getElementById('nav');
  const toggle   = nav.querySelector('.nav__toggle');
  const menu     = document.getElementById('mobile-menu');
  const mobileLinks = menu.querySelectorAll('.nav__mobile-link, .nav__mobile-cta');

  // Scroll: transparent → white
  function handleScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  // Mobile toggle
  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function() {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on link click
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (menu.classList.contains('open') &&
        !nav.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ------------------------------------------------------------
   2. SCROLL REVEAL — Intersection Observer
   ------------------------------------------------------------ */
(function initReveal() {
  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — only trigger once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
})();

/* ------------------------------------------------------------
   3. HERO — immediately visible
   ------------------------------------------------------------ */
(function initHero() {
  // Hero content is above fold — force visible without waiting
  const heroReveals = document.querySelectorAll('.hero .reveal');
  requestAnimationFrame(function() {
    heroReveals.forEach(function(el, i) {
      setTimeout(function() {
        el.classList.add('visible');
      }, i * 120);
    });
  });
})();

/* ------------------------------------------------------------
   4. CONTACT FORM — Supabase
------------------------------------------------------------ */

(function initForm() {

    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    if (!form) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalButton = submitBtn.innerHTML;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        feedback.className = "form-note";
        feedback.textContent = "";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        if (!name) {
            showFeedback("Please enter your name.", "error");
            return;
        }

        if (!email || !isValidEmail(email)) {
            showFeedback("Please enter a valid email.", "error");
            return;
        }

        if (!message) {
            showFeedback("Please tell us about your project.", "error");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        let ip = null;

        try {

            ip = await fetch("https://api.ipify.org?format=json")
                .then(r => r.json())
                .then(data => data.ip);

        } catch (err) {}

        const browser =
            navigator.userAgentData?.brands
                ?.map(b => b.brand)
                .join(", ")
            || navigator.appName;

        const device =
            /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
                ? "Mobile"
                : "Desktop";

        const { error } = await supabase
            .from("contact_messages")
            .insert([{

                name,
                email,
                service,
                message,

                ip_address: ip,
                browser: browser,
                device: device,
                page_url: window.location.href,
                user_agent: navigator.userAgent

            }]);

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalButton;

        if (error) {

            console.error(error);

            showFeedback(
                "Something went wrong. Please try again.",
                "error"
            );

            return;

        }

        showFeedback(
            "Thank you! Your message has been sent successfully.",
            "success"
        );

        form.reset();

    });

    function showFeedback(msg, type) {

        feedback.textContent = msg;
        feedback.className = "form-note " + type;

    }

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

})();

/* ------------------------------------------------------------
   5. FOOTER — dynamic year
   ------------------------------------------------------------ */
(function initFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* ------------------------------------------------------------
   6. ACTIVE NAV LINK — highlight on scroll
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function(section) {
    observer.observe(section);
  });
})();
------------------------------------------------------------ */


/* ------------------------------------------------------------
   7. SERVICE CARDS — keyboard accessibility
   ------------------------------------------------------------ */
(function initServiceCards() {
  document.querySelectorAll('.service-card, .project-card, .tech-card').forEach(function(card) {
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Animate card as if hovered
        card.classList.add('focused');
        setTimeout(function() { card.classList.remove('focused'); }, 400);
      }
    });
  });
})();

/* ------------------------------------------------------------
   8. PERF — lazy-load images when supported
   ------------------------------------------------------------ */
(function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return; // native lazy load supported
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;

  const imgObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imgObserver.unobserve(img);
      }
    });
  });

  images.forEach(function(img) { imgObserver.observe(img); });
})();
