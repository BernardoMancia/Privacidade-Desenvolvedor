(function () {
  var KEY = 'ms_lang';

  function detectDefaultLang() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'pt' || saved === 'en') return saved;
      var navLang = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
      return navLang.indexOf('pt') === 0 ? 'pt' : 'en';
    } catch (e) {
      return 'pt';
    }
  }

  window.getLang = function () {
    return detectDefaultLang();
  };

  window.setLang = function (lang) {
    var safeLang = lang === 'en' ? 'en' : 'pt';
    try {
      localStorage.setItem(KEY, safeLang);
    } catch (e) {}
    document.documentElement.lang = safeLang === 'pt' ? 'pt-BR' : 'en';
    applyTranslations(safeLang);
    updateBtn(safeLang);
  };

  window.toggleLang = function () {
    setLang(getLang() === 'pt' ? 'en' : 'pt');
  };

  function refreshYears() {
    var year = String(new Date().getFullYear());
    var el = document.getElementById('footer-year');
    if (el) el.textContent = year;
    document.querySelectorAll('.js-current-year').forEach(function (node) {
      node.textContent = year;
    });
  }

  function applyPageMeta(lang) {
    if (!window.i18n) return;
    var page = document.documentElement.getAttribute('data-i18n-page');
    if (!page) return;
    var titleKey = 'meta.' + page + '.title';
    var descKey = 'meta.' + page + '.desc';
    if (window.i18n[titleKey]) {
      document.title = window.i18n[titleKey][lang] || window.i18n[titleKey]['pt'];
    }
    if (window.i18n[descKey]) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', window.i18n[descKey][lang] || window.i18n[descKey]['pt']);
      }
    }
  }

  function applyTranslations(lang) {
    if (!window.i18n) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (window.i18n[key]) {
        el.textContent = window.i18n[key][lang] || window.i18n[key]['pt'];
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (window.i18n[key]) {
        el.innerHTML = window.i18n[key][lang] || window.i18n[key]['pt'];
      }
    });
    applyPageMeta(lang);
    refreshYears();
  }

  function updateBtn(lang) {
    var sw = document.getElementById('lang-switch');
    if (sw) {
      sw.setAttribute('data-lang', lang);
      sw.setAttribute('aria-checked', lang === 'en' ? 'true' : 'false');
      sw.setAttribute('aria-label',
        lang === 'pt'
          ? 'Idioma: Português — clique para English'
          : 'Language: English — click for Português'
      );
    }
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'pt' ? 'EN' : 'PT';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = getLang();
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    applyTranslations(lang);
    updateBtn(lang);

    var sw = document.getElementById('lang-switch');
    if (sw) {
      sw.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLang();
        }
      });
    }
  });
})();
