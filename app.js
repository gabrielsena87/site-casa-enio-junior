(() => {
  'use strict';

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const smoothScrollTo = (targetSelector) => {
    if (!targetSelector || targetSelector === '#') return false;
    if (targetSelector === '#topo') {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
      return true;
    }
    let target = null;
    try {
      target = document.querySelector(targetSelector);
    } catch {
      return false;
    }
    if (!target) return false;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
    return true;
  };

  /**
   * 1. Navbar scroll state & 2. Mobile menu drawer
   */
  const initNavbar = () => {
    const siteNav = document.getElementById('siteNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (siteNav) {
      const updateNavScroll = () => {
        siteNav.classList.toggle('is-scrolled', window.scrollY > 40);
      };
      updateNavScroll();
      window.addEventListener('scroll', updateNavScroll, { passive: true });
    }

    if (!navToggle || !navMenu) return;

    const setMenuState = (isOpen) => {
      navMenu.classList.toggle('is-open', isOpen);
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle.addEventListener('click', () => {
      const isCurrentlyOpen = navMenu.classList.contains('is-open');
      setMenuState(!isCurrentlyOpen);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('is-open')) return;
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenuState(false);
        navToggle.focus();
      }
    });
  };

  /**
   * 3. Filterable gallery
   */
  const initGalleryFilters = () => {
    const filterButtons = Array.from(document.querySelectorAll('.gallery-filters .filter-btn'));
    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item'));

    if (!filterButtons.length || !galleryItems.length) return;

    const applyFilter = (filterValue) => {
      const normalizedFilter = (filterValue || 'all').trim();

      galleryItems.forEach((item) => {
        const rawCategories = (item.dataset.category || '').trim();
        const categories = rawCategories ? rawCategories.split(/[\s,]+/) : [];
        const matches =
          normalizedFilter === 'all' ||
          rawCategories === normalizedFilter ||
          categories.includes(normalizedFilter);

        item.classList.toggle('is-hidden', !matches);
        item.setAttribute('aria-hidden', String(!matches));
      });
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((other) => {
          const active = other === btn;
          other.classList.toggle('is-active', active);
          other.setAttribute('aria-pressed', String(active));
        });

        applyFilter(btn.dataset.filter || 'all');
      });
    });
  };

  /**
   * 4. Lightbox modal (respects active gallery filter)
   */
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox || !lightboxImg) return;

    let visibleItems = [];
    let currentIndex = 0;
    let previousBodyOverflow = '';
    let lastFocusedElement = null;

    const getVisibleItems = () =>
      Array.from(document.querySelectorAll('.gallery-grid .gallery-item')).filter(
        (item) => !item.classList.contains('is-hidden')
      );

    const renderCurrentItem = () => {
      if (!visibleItems.length) return;

      const item = visibleItems[currentIndex];
      const img = item.querySelector('img');
      const caption = item.dataset.caption || (img ? img.alt : '') || '';
      const src = img ? img.dataset.full || img.currentSrc || img.src : '';

      if (src) {
        lightboxImg.src = src;
      }
      lightboxImg.alt = (img && img.alt) || caption;

      if (lightboxCaption) {
        lightboxCaption.textContent = caption;
      }

      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
      }

      const hasMultiple = visibleItems.length > 1;
      if (lightboxPrev) lightboxPrev.disabled = !hasMultiple;
      if (lightboxNext) lightboxNext.disabled = !hasMultiple;
    };

    const openLightbox = (clickedItem) => {
      visibleItems = getVisibleItems();
      if (!visibleItems.length) return;

      const foundIndex = visibleItems.indexOf(clickedItem);
      currentIndex = foundIndex >= 0 ? foundIndex : 0;

      lastFocusedElement = document.activeElement;
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      renderCurrentItem();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');

      if (lightboxClose) {
        lightboxClose.focus();
      }
    };

    const closeLightbox = () => {
      if (!lightbox.classList.contains('is-open')) return;

      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = previousBodyOverflow;

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    };

    const stepLightbox = (direction) => {
      if (visibleItems.length <= 1) return;
      currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
      renderCurrentItem();
    };

    document.addEventListener('click', (event) => {
      const galleryItem = event.target.closest('.gallery-grid .gallery-item');
      if (galleryItem && !galleryItem.classList.contains('is-hidden')) {
        openLightbox(galleryItem);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (lightbox.classList.contains('is-open')) {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          stepLightbox(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          stepLightbox(1);
        }
        return;
      }

      const galleryItem = event.target.closest('.gallery-grid .gallery-item');
      if (
        galleryItem &&
        !galleryItem.classList.contains('is-hidden') &&
        galleryItem.tagName !== 'BUTTON' &&
        galleryItem.tagName !== 'A' &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        openLightbox(galleryItem);
      }
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => stepLightbox(-1));
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => stepLightbox(1));
    }

    lightbox.addEventListener('click', (event) => {
      if (
        event.target === lightbox ||
        event.target.classList.contains('lightbox-backdrop') ||
        event.target.hasAttribute('data-lightbox-close')
      ) {
        closeLightbox();
      }
    });
  };

  /**
   * 5. FAQ Accordion
   */
  const initFaqAccordion = () => {
    const triggers = document.querySelectorAll('#faq .faq-trigger, .faq-trigger');
    if (!triggers.length) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const faqItem = trigger.closest('.faq-item');
        if (!faqItem) return;

        const isOpen = faqItem.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });
    });
  };

  /**
   * 6. Lightweight Scroll Reveal via IntersectionObserver
   */
  const initScrollReveal = () => {
    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  };

  /**
   * 7. Placeholder reservation / WhatsApp actions & smooth internal anchors
   */
  const initPlaceholderActions = () => {
    let toastTimer = null;
    let toastEl = null;

    const showDiscreteNotice = (message) => {
      if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.className = 'placeholder-toast';
        toastEl.setAttribute('role', 'status');
        toastEl.setAttribute('aria-live', 'polite');
        Object.assign(toastEl.style, {
          position: 'fixed',
          left: '50%',
          bottom: '24px',
          transform: 'translateX(-50%) translateY(12px)',
          backgroundColor: '#1F2B1E',
          color: '#F6F2EA',
          padding: '12px 20px',
          borderRadius: '999px',
          fontSize: '0.875rem',
          lineHeight: '1.4',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.22)',
          zIndex: '1200',
          opacity: '0',
          pointerEvents: 'none',
          transition: 'opacity 220ms ease, transform 220ms ease',
          maxWidth: 'calc(100vw - 32px)',
          textAlign: 'center',
        });
        document.body.appendChild(toastEl);
      }

      toastEl.textContent = message;
      requestAnimationFrame(() => {
        toastEl.style.opacity = '1';
        toastEl.style.transform = 'translateX(-50%) translateY(0)';
      });

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        if (!toastEl) return;
        toastEl.style.opacity = '0';
        toastEl.style.transform = 'translateX(-50%) translateY(12px)';
      }, 3600);
    };

    document.addEventListener('click', (event) => {
      const placeholderTrigger = event.target.closest(
        'a[href="#reservas"], [data-placeholder-wa], .whatsapp-float'
      );

      if (placeholderTrigger) {
        const href = placeholderTrigger.getAttribute('href') || '';
        const isPlaceholderWa =
          placeholderTrigger.hasAttribute('data-placeholder-wa') ||
          (placeholderTrigger.classList.contains('whatsapp-float') &&
            (!href || href === '#' || href === '#reservas'));

        if (href === '#reservas') {
          event.preventDefault();
          smoothScrollTo('#reservas');
        } else if (isPlaceholderWa && (!href || href === '#')) {
          event.preventDefault();
        }

        if (isPlaceholderWa) {
          const customNotice = placeholderTrigger.dataset.placeholderMessage;
          showDiscreteNotice(
            customNotice ||
              'Canal oficial de reservas via WhatsApp será ativado após confirmação do briefing.'
          );
        }
        return;
      }

      const anchor = event.target.closest('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (hash && hash.length > 1 && smoothScrollTo(hash)) {
          event.preventDefault();
        }
      }
    });
  };

  const init = () => {
    initNavbar();
    initGalleryFilters();
    initLightbox();
    initFaqAccordion();
    initScrollReveal();
    initPlaceholderActions();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
