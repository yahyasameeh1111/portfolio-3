/**
 * Yahya Sameeh P P — Portfolio Interactive Engine
 * Apple-Inspired Motion System powered by Framer Motion (Motion core)
 * Features:
 *  - Apple Keynote Hero Stagger Entrance & Metallic Specular Shimmer
 *  - Apple VisionOS / Apple TV 3D Bento Card Tilt with Silky Spring Physics
 *  - Dynamic Specular Glare & Hairline Edge Lighting
 *  - Apple Scroll Progress Bar driven by Motion.scroll
 *  - Scroll-Driven Progressive Unblur & Entrance via Motion.inView
 *  - Apple Haptic Spring Micro-Interactions (Scale press feedback)
 *  - Ambient Dark Space Cursor Atmosphere
 *  - Seamless Apple View Transitions
 *  - Local IST Clock with Radar Pulse
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initAppleAmbientSpotlight();
  initAppleScrollProgress();
  initAppleCardTilt();
  initAppleHapticFeedback();
  initApplePageEntrances();
  initAppleScrollReveals();
  initApplePageTransitions();
  initPillSelections();
  initContactForm();
  initKeyboardNav();
});

/**
 * 1. Live Local Clock: Malappuram, Kerala (Asia/Kolkata - IST)
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
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const timeString = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
      clockElements.forEach((el) => {
        el.textContent = timeString;
      });
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * 2. Apple Dark-Mode Ambient Atmosphere
 * Smoothly follows cursor across the viewport with lerp physics
 */
function initAppleAmbientSpotlight() {
  const spotlight = document.querySelector('.ambient-spotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let rafActive = false;

  function updateCursorPos(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafActive) {
      rafActive = true;
      requestAnimationFrame(renderAmbient);
    }
  }

  function renderAmbient() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    spotlight.style.setProperty('--cursor-x', `${currentX.toFixed(1)}px`);
    spotlight.style.setProperty('--cursor-y', `${currentY.toFixed(1)}px`);

    if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
      requestAnimationFrame(renderAmbient);
    } else {
      rafActive = false;
    }
  }

  window.addEventListener('pointermove', updateCursorPos, { passive: true });
}

/**
 * 3. Apple Minimalist Hairline Scroll Progress Bar
 * Driven by Framer Motion's Motion.scroll
 */
function initAppleScrollProgress() {
  const progressBar = document.querySelector('.apple-scroll-progress');
  if (!progressBar) return;

  if (window.Motion && typeof window.Motion.scroll === 'function') {
    window.Motion.scroll((progress) => {
      progressBar.style.transform = `scaleX(${progress})`;
    });
  } else {
    // Fallback scroll listener
    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }
}

/**
 * 4. Apple VisionOS / Apple TV 3D Bento Card Tilt & Specular Reflection
 * Real-time 3D perspective rotation with spring-physics decay and light glare
 */
function initAppleCardTilt() {
  const cards = document.querySelectorAll('.bento-card');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  cards.forEach((card) => {
    let bounds = null;
    let isHovered = false;
    let targetX = 0; // rotateX
    let targetY = 0; // rotateY
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    function getBounds() {
      bounds = card.getBoundingClientRect();
    }

    function onPointerEnter() {
      isHovered = true;
      getBounds();
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTilt);
    }

    function onPointerMove(e) {
      if (!bounds) getBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      // Update specular highlight CSS variables
      card.style.setProperty('--mouse-x', `${mouseX.toFixed(1)}px`);
      card.style.setProperty('--mouse-y', `${mouseY.toFixed(1)}px`);

      // Normalized coordinates from card center [-1, 1]
      const halfWidth = bounds.width / 2;
      const halfHeight = bounds.height / 2;
      const dx = (mouseX - halfWidth) / halfWidth;
      const dy = (mouseY - halfHeight) / halfHeight;

      // Subtle Apple-grade tilt (max ~5.5 degrees)
      targetX = -dy * 5.5;
      targetY = dx * 5.5;
    }

    function updateTilt() {
      const lerp = 0.12; // Apple silky spring damping

      if (isHovered) {
        currentX += (targetX - currentX) * lerp;
        currentY += (targetY - currentY) * lerp;

        card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
        rafId = requestAnimationFrame(updateTilt);
      } else {
        // Smooth return to neutral on leave
        currentX += (0 - currentX) * lerp;
        currentY += (0 - currentY) * lerp;

        if (Math.abs(currentX) > 0.04 || Math.abs(currentY) > 0.04) {
          card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(1, 1, 1)`;
          rafId = requestAnimationFrame(updateTilt);
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      }
    }

    function onPointerLeave() {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    }

    card.addEventListener('pointerenter', onPointerEnter);
    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', onPointerLeave);
  });
}

/**
 * 5. Apple Spring Entrance Choreography powered by Framer Motion
 * Staggers cards, headings, and squircles with Apple's signature spring curve
 */
function initApplePageEntrances() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const Motion = window.Motion;
  const appleEase = [0.16, 1, 0.3, 1]; // Apple's fluid spring curve

  if (Motion && typeof Motion.animate === 'function') {
    // 1. Header Entrance
    const header = document.querySelector('header');
    if (header) {
      Motion.animate(
        header,
        { opacity: [0, 1], y: [-16, 0] },
        { duration: 0.7, ease: appleEase }
      );
    }

    // 2. Hero Giant Title Reveal (Home page)
    const giantTitle = document.querySelector('.hero-giant-title');
    if (giantTitle) {
      Motion.animate(
        giantTitle,
        {
          opacity: [0, 1],
          y: [36, 0],
          scale: [0.97, 1],
          filter: ['blur(14px)', 'blur(0px)'],
        },
        { duration: 1.0, ease: appleEase }
      );
    }

    // 3. Bento Grid Cards Stagger Entrance
    const cards = document.querySelectorAll('.bento-card');
    if (cards.length > 0) {
      const staggerDelay = typeof Motion.stagger === 'function'
        ? Motion.stagger(0.08, { start: 0.12 })
        : 0.08;

      Motion.animate(
        cards,
        {
          opacity: [0, 1],
          y: [36, 0],
          scale: [0.94, 1],
          filter: ['blur(8px)', 'blur(0px)'],
        },
        {
          delay: staggerDelay,
          duration: 0.85,
          ease: appleEase,
        }
      );
    }

    // 4. Bento Headings Micro-stagger
    const headings = document.querySelectorAll('.bento-heading');
    if (headings.length > 0) {
      const headingDelay = typeof Motion.stagger === 'function'
        ? Motion.stagger(0.08, { start: 0.28 })
        : 0.12;

      Motion.animate(
        headings,
        { opacity: [0, 1], y: [16, 0] },
        {
          delay: headingDelay,
          duration: 0.7,
          ease: appleEase,
        }
      );
    }

    // 5. Tool Squircles Pop-in
    const squircles = document.querySelectorAll('.tech-squircle');
    if (squircles.length > 0) {
      const squircleDelay = typeof Motion.stagger === 'function'
        ? Motion.stagger(0.06, { start: 0.38 })
        : 0.1;

      Motion.animate(
        squircles,
        { opacity: [0, 1], scale: [0.75, 1], y: [10, 0] },
        {
          delay: squircleDelay,
          duration: 0.6,
          ease: appleEase,
        }
      );
    }
  }
}

/**
 * 6. Apple Scroll-Driven Reveals powered by Framer Motion (Motion.inView)
 * Progressively reveals content cards & paragraphs with blur unmasking
 */
function initAppleScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const Motion = window.Motion;
  const appleEase = [0.16, 1, 0.3, 1];

  if (Motion && typeof Motion.inView === 'function') {
    elements.forEach((el) => {
      Motion.inView(
        el,
        () => {
          Motion.animate(
            el,
            {
              opacity: [0, 1],
              y: [34, 0],
              scale: [0.96, 1],
              filter: ['blur(10px)', 'blur(0px)'],
            },
            {
              duration: 0.8,
              ease: appleEase,
            }
          );
        },
        { margin: '0px 0px -8% 0px' }
      );
    });
  } else {
    // IntersectionObserver fallback
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }
}

/**
 * 7. Apple Haptic Micro-Interactions (Spring Press Feedback)
 * Tactile compression on click/tap, spring rebound on release
 */
function initAppleHapticFeedback() {
  const interactives = document.querySelectorAll('.bento-card, .tag-pill, .tech-squircle, button, a.btn');

  interactives.forEach((el) => {
    el.addEventListener('pointerdown', () => {
      el.classList.add('apple-pressed');
    }, { passive: true });

    const releasePress = () => {
      el.classList.remove('apple-pressed');
    };

    el.addEventListener('pointerup', releasePress, { passive: true });
    el.addEventListener('pointercancel', releasePress, { passive: true });
    el.addEventListener('pointerleave', releasePress, { passive: true });
  });
}

/**
 * 8. Apple Seamless View Transitions powered by Framer Motion
 * Smooth out-scale and blur exit followed by in-scale landing
 */
function initApplePageTransitions() {
  const links = document.querySelectorAll('a[data-nav]');
  const main = document.querySelector('main');
  const Motion = window.Motion;
  const appleEase = [0.16, 1, 0.3, 1];

  // Landing entrance transition on new page
  if (main && Motion && typeof Motion.animate === 'function') {
    Motion.animate(
      main,
      {
        opacity: [0, 1],
        scale: [1.015, 1],
        filter: ['blur(6px)', 'blur(0px)'],
        y: [8, 0],
      },
      { duration: 0.45, ease: appleEase }
    );
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
        e.preventDefault();

        if (main && Motion && typeof Motion.animate === 'function') {
          Motion.animate(
            main,
            {
              opacity: [1, 0],
              scale: [1, 0.985],
              filter: ['blur(0px)', 'blur(6px)'],
              y: [0, -10],
            },
            {
              duration: 0.22,
              ease: appleEase,
            }
          ).then(() => {
            window.location.href = href;
          }).catch(() => {
            window.location.href = href;
          });

          // Safeguard fallback navigation
          setTimeout(() => {
            window.location.href = href;
          }, 240);
        } else {
          // CSS fallback
          if (main) main.classList.add('page-exiting');
          setTimeout(() => {
            window.location.href = href;
          }, 220);
        }
      }
    });
  });
}

/**
 * 9. Interactive Form Pill Selectors
 */
function initPillSelections() {
  const pills = document.querySelectorAll('.tag-pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
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
 * 10. Interactive Contact Form with Feedback Animation
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', () => {
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
 * 11. Keyboard Navigation for Power Users
 */
function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal-active');
      modals.forEach((m) => m.classList.add('hidden'));
    }
  });
}
