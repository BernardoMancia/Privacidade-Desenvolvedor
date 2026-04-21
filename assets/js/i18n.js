(function () {
  var KEY = 'ms_lang';

  window.getLang = function () {
    return localStorage.getItem(KEY) || 'pt';
  };

  window.setLang = function (lang) {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    applyTranslations(lang);
    updateBtn(lang);
  };

  window.toggleLang = function () {
    setLang(getLang() === 'pt' ? 'en' : 'pt');
  };

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (window.i18n && window.i18n[key]) {
        el.textContent = window.i18n[key][lang] || window.i18n[key]['pt'];
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (window.i18n && window.i18n[key]) {
        el.innerHTML = window.i18n[key][lang] || window.i18n[key]['pt'];
      }
    });
  }

  function updateBtn(lang) {
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'pt' ? 'EN' : 'PT';
      btn.setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para Português');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = getLang();
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    applyTranslations(lang);
    updateBtn(lang);
  });
})();
