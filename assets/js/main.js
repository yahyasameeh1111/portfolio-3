/**
 * Yahya Sameeh P P — Portfolio Interactive Engine
 * Micro-interactions, Live Time (IST), Card Spotlight, and Smooth View Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initCardSpotlight();
  initPillSelections();
  initContactForm();
  initPageTransitions();
  initKeyboardNav();
});

/**
 * Live Local Clock: Edappatta, Kerala (Asia/Kolkata - IST)
 */
function initLiveClock() {
  const clockElements = document.querySelectorAll('.live-time-display');
  if (!clockElements.length) return;

  function updateTime() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const timeString = formatter.format(now);

      clockElements.forEach((el) => {
        el.textContent = timeString;
      });
    } catch (e) {
      // Fallback
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const timeString = `${formattedHours}:${minutes} ${ampm}`;
      clockElements.forEach((el) => {
        el.textContent = timeString;
      });
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * Bento Grid Spotlight Hover Effect
 * Tracks mouse position relative to each card for subtle radial gradient illumination
 */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Interactive Form Pill Selectors
 */
function initPillSelections() {
  const pills = document.querySelectorAll('.tag-pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      // Toggle for multi-select, or group radio
      const isRadio = pill.dataset.group !== undefined;
      if (isRadio) {
        const group = pill.dataset.group;
        document.querySelectorAll(`.tag-pill[data-group="${group}"]`).forEach((p) => {
          p.classList.remove('active', 'border-white', 'text-white', 'bg-white/10');
        });
        pill.classList.add('active', 'border-white', 'text-white', 'bg-white/10');
      } else {
        pill.classList.toggle('active');
        pill.classList.toggle('border-white');
        pill.classList.toggle('text-white');
        pill.classList.toggle('bg-white/10');
      }
    });
  });
}

/**
 * Interactive Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // If handled via standard Netlify form post, let it proceed, or simulate smooth client response
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;
      submitBtn.disabled = true;
    }

    // Let netlify form or mailto handle or show success notice
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = `✓ Message Sent!`;
        submitBtn.classList.add('bg-emerald-600', 'border-emerald-500');
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-emerald-600', 'border-emerald-500');
          form.reset();
        }, 4000);
      }
    }, 1000);
  });
}

/**
 * Smooth SPA-style Transitions for internal navigation
 */
function initPageTransitions() {
  const links = document.querySelectorAll('a[data-nav]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
        e.preventDefault();

        // Animate headings and text elements smoothly on exit
        const headings = document.querySelectorAll('.bento-heading, .hero-giant-title, h1');
        headings.forEach((heading) => {
          heading.classList.add('heading-exiting');
        });

        // Smoothly fade & translate the main container
        const main = document.querySelector('main') || document.body;
        main.classList.add('page-exiting');

        setTimeout(() => {
          window.location.href = href;
        }, 220);
      }
    });
  });
}

/**
 * Keyboard Navigation for Power Users
 */
function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    // Only if not focused on input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal-active');
      modals.forEach((m) => m.classList.add('hidden'));
    }
  });
}
