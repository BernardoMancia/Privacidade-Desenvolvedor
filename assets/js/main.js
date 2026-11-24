(function () {
  var canvas = document.getElementById('particles-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var particles = [];
  var animationId = null;
  var lastWidth = 0;
  var reducedMotionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.35,
      speedX: (Math.random() - 0.5) * 0.28,
      speedY: (Math.random() - 0.5) * 0.28,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '0, 245, 255' : '123, 92, 240'
    };
  }

  function initParticles() {
    particles = [];
    var count = Math.min(95, Math.floor((canvas.width * canvas.height) / 14500));
    for (var i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function renderFrame() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ', ' + p.opacity + ')';
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    }
  }

  function loopParticles() {
    renderFrame();
    if (!reducedMotionQuery.matches && !document.hidden) {
      animationId = requestAnimationFrame(loopParticles);
    } else {
      animationId = null;
    }
  }

  function startParticles() {
    if (!canvas || !ctx) return;
    if (animationId !== null) return;
    if (reducedMotionQuery.matches) {
      renderFrame();
      return;
    }
    if (!document.hidden) {
      animationId = requestAnimationFrame(loopParticles);
    }
  }

  function stopParticles() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  if (canvas && ctx) {
    lastWidth = window.innerWidth;
    resizeCanvas();
    initParticles();
    startParticles();

    window.addEventListener('resize', function () {
      if (Math.abs(window.innerWidth - lastWidth) < 2) return;
      lastWidth = window.innerWidth;
      stopParticles();
      resizeCanvas();
      initParticles();
      startParticles();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopParticles();
      } else {
        startParticles();
      }
    });
  }

  /* Showcase State & Dynamic Hero Counters */
  function syncShowcaseState() {
    var pubGrid = document.getElementById('published-apps-grid');
    var pubEmpty = document.getElementById('published-apps-empty');
    var devGrid = document.getElementById('dev-apps-grid');
    var projGrid = document.getElementById('projects-grid');
    var heroCta = document.getElementById('hero-cta-apps');

    var pubCount = pubGrid ? pubGrid.querySelectorAll('article.app-card').length : 0;
    var devCount = devGrid ? devGrid.querySelectorAll('article.app-card:not(.is-discontinued)').length : 0;
    var projCount = projGrid ? projGrid.querySelectorAll('article.project-card').length : 0;

    if (pubGrid && pubEmpty) {
      if (pubCount === 0) {
        pubGrid.style.display = 'none';
        pubEmpty.style.display = 'block';
      } else {
        pubGrid.style.display = 'grid';
        pubEmpty.style.display = 'none';
      }
    }

    if (heroCta) {
      heroCta.setAttribute('href', pubCount > 0 ? '#apps-published' : '#apps-dev');
    }

    var statPub = document.getElementById('stat-published-count');
    var statDev = document.getElementById('stat-dev-apps-count');
    var statProj = document.getElementById('stat-projects-count');

    if (statPub) statPub.textContent = String(pubCount);
    if (statDev) statDev.textContent = String(devCount);
    if (statProj) statProj.textContent = String(projCount);

    /* Project Filter Pills */
    var filterBar = document.getElementById('projects-filters');
    if (filterBar && projGrid) {
      var filterBtns = filterBar.querySelectorAll('[data-filter]');
      var projCards = projGrid.querySelectorAll('article.project-card');
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-filter') || 'all';
          filterBtns.forEach(function (b) {
            b.classList.toggle('active', b === btn);
            b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
          });
          projCards.forEach(function (card) {
            var cats = (card.getAttribute('data-category') || '').split(/\s+/);
            var show = target === 'all' || cats.indexOf(target) !== -1;
            card.style.display = show ? 'flex' : 'none';
          });
        });
      });
    }
  }

  syncShowcaseState();

  var navEl = document.getElementById('main-nav');
  window.addEventListener('scroll', function () {
    if (!navEl) return;
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Mobile Menu */
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function setMenuOpen(isOpen) {
    if (!navEl || !navToggle || !mobileMenu) return;
    navEl.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') !== 'true';
      setMenuOpen(open);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (navToggle.getAttribute('aria-expanded') === 'true' && navEl && !navEl.contains(e.target)) {
        setMenuOpen(false);
      }
    });
  }

  /* Scroll Reveal */
  if ('IntersectionObserver' in window && !reducedMotionQuery.matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* Smooth Anchor Scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
})();
