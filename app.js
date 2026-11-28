(() => {
  'use strict';

  document.documentElement.classList.add('js-ready');

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
   * 1. Menu Superior (Casa Pitanga: scrolled > 40px + FAB mobile após Hero)
   */
  const initNavbarAndFab = () => {
    const siteNav = document.getElementById('siteNav');
    const mobileFab = document.getElementById('mobileFab');
    const heroEl = document.getElementById('topo');

    const updateOnScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (siteNav && !siteNav.classList.contains('is-solid')) {
        siteNav.classList.toggle('is-scrolled', y > 40);
      }
      if (mobileFab && heroEl) {
        const threshold = Math.max(320, heroEl.offsetHeight - 120);
        mobileFab.classList.toggle('show', y > threshold);
      }
    };

    updateOnScroll();
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    window.addEventListener('resize', updateOnScroll, { passive: true });
  };

  /**
   * 2. Reveal de Imagens Estilo Casa Pitanga ([data-rv] -> .is-revealed)
   */
  const initImageReveals = () => {
    const frames = Array.from(document.querySelectorAll('[data-rv]'));
    if (!frames.length) return;

    const revealFrame = (el) => el.classList.add('is-revealed');

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      frames.forEach(revealFrame);
      return;
    }

    const checkVisible = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 900;
      frames.forEach((el) => {
        if (el.classList.contains('is-revealed')) return;
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.top <= vh + 100 && rect.bottom >= -80) {
          revealFrame(el);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealFrame(entry.target);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.01,
        rootMargin: '100px 0px 100px 0px',
      }
    );

    frames.forEach((el) => observer.observe(el));
    checkVisible();
    window.addEventListener('scroll', checkVisible, { passive: true });
    window.addEventListener('resize', checkVisible, { passive: true });
    window.addEventListener('load', checkVisible, { once: true });
  };

  /**
   * 3. Filtros da Galeria
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
   * 4. Lightbox Universal (fotos editoriais por seção data-gal + galeria filtrada)
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

    let activeItems = [];
    let currentIndex = 0;
    let previousBodyOverflow = '';
    let lastFocusedElement = null;

    const renderCurrentItem = () => {
      if (!activeItems.length) return;
      const item = activeItems[currentIndex];
      const img = item.querySelector('img');
      const captionEl = item.querySelector('.photo-caption, .gallery-caption');
      const caption = item.dataset.caption || (captionEl ? captionEl.textContent.trim() : '') || (img ? img.alt : '') || '';
      const src = img ? img.dataset.full || img.currentSrc || img.src : '';

      if (src) lightboxImg.src = src;
      lightboxImg.alt = (img && img.alt) || caption;

      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${activeItems.length}`;

      const hasMultiple = activeItems.length > 1;
      if (lightboxPrev) lightboxPrev.disabled = !hasMultiple;
      if (lightboxNext) lightboxNext.disabled = !hasMultiple;
    };

    const openWithCollection = (items, clickedItem) => {
      if (!items.length) return;
      activeItems = items;
      const idx = items.indexOf(clickedItem);
      currentIndex = idx >= 0 ? idx : 0;

      lastFocusedElement = document.activeElement;
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      renderCurrentItem();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');

      if (lightboxClose) lightboxClose.focus();
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
      if (activeItems.length <= 1) return;
      currentIndex = (currentIndex + direction + activeItems.length) % activeItems.length;
      renderCurrentItem();
    };

    const handleTriggerClick = (target) => {
      const galleryItem = target.closest('.gallery-grid .gallery-item');
      if (galleryItem && !galleryItem.classList.contains('is-hidden')) {
        const visibleGallery = Array.from(document.querySelectorAll('.gallery-grid .gallery-item')).filter(
          (item) => !item.classList.contains('is-hidden')
        );
        openWithCollection(visibleGallery, galleryItem);
        return true;
      }

      const photoCard = target.closest('.photo-card[data-gal]');
      if (photoCard) {
        const gal = photoCard.dataset.gal;
        const groupItems = Array.from(document.querySelectorAll(`.photo-card[data-gal="${CSS.escape(gal)}"]`));
        openWithCollection(groupItems, photoCard);
        return true;
      }

      return false;
    };

    document.addEventListener('click', (event) => {
      handleTriggerClick(event.target);
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

      if (event.key === 'Enter' || event.key === ' ') {
        const photoCard = event.target.closest('.photo-card[data-gal]');
        if (photoCard) {
          event.preventDefault();
          handleTriggerClick(photoCard);
        }
      }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => stepLightbox(1));

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  };

  /**
   * 5. FAQ Acordeão
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
   * 6. Navegação Suave em Âncoras Internas
   */
  const initSmoothAnchors = () => {
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (hash && hash.length > 1 && smoothScrollTo(hash)) {
        event.preventDefault();
      }
    });
  };

  const init = () => {
    initNavbarAndFab();
    initImageReveals();
    initGalleryFilters();
    initLightbox();
    initFaqAccordion();
    initSmoothAnchors();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
