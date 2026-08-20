(function () {
  var root = typeof window !== 'undefined' ? window : globalThis;
  var THEME_ATTRS = ['class', 'data-theme', 'data-color-mode', 'data-bs-theme'];

  function elementImpliesDark(el) {
    if (!el) return null;
    if (el.classList.contains('dark') || el.classList.contains('dark-mode')) return true;
    var theme = el.getAttribute('data-theme') || el.getAttribute('data-color-mode') || el.getAttribute('data-bs-theme');
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return null;
  }

  function isEmbedded(win) {
    try {
      return !!(win && win.parent && win.parent !== win);
    } catch (_) {
      return true;
    }
  }

  function windowThemeState(win) {
    try {
      var roots = [win.document.documentElement, win.document.body];
      var explicitLight = false;
      for (var i = 0; i < roots.length; i += 1) {
        var state = elementImpliesDark(roots[i]);
        if (state === true) return true;
        if (state === false) explicitLight = true;
      }
      return explicitLight ? false : null;
    } catch (_) {
      return null;
    }
  }

  function parentThemeState(win) {
    var seen = [];
    var current = win;
    while (current) {
      var parent = null;
      try {
        parent = current.parent;
      } catch (_) {
        return null;
      }
      if (!parent || parent === current || seen.indexOf(parent) !== -1) return null;
      seen.push(parent);
      var state = windowThemeState(parent);
      if (state !== null) return state;
      current = parent;
    }
    return null;
  }

  function storageThemeState(win) {
    try {
      var stored = win.localStorage.getItem('theme') || win.localStorage.getItem('color-mode') || win.localStorage.getItem('vueuse-color-scheme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
    } catch (_) { }
    return null;
  }

  function detectKoobooDark(win) {
    var targetWin = win || root;
    var embedded = isEmbedded(targetWin);
    var explicit = embedded ? parentThemeState(targetWin) : windowThemeState(targetWin);
    if (explicit !== null) return explicit;

    var stored = storageThemeState(targetWin);
    if (stored !== null) return stored;
    if (embedded) return false;

    try {
      return !!(targetWin.matchMedia && targetWin.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (_) {
      return false;
    }
  }

  function observeThemeRoots(onChange) {
    var observed = [];
    function observeEl(el) {
      if (!el || observed.indexOf(el) !== -1) return;
      observed.push(el);
      try {
        new MutationObserver(onChange).observe(el, { attributes: true, attributeFilter: THEME_ATTRS });
      } catch (_) { }
    }

    var embedded = isEmbedded(root);
    var current = embedded ? root.parent : root;
    var seen = [];
    while (current && seen.indexOf(current) === -1) {
      seen.push(current);
      try {
        observeEl(current.document.documentElement);
        observeEl(current.document.body);
        if (!embedded || !current.parent || current.parent === current) break;
        current = current.parent;
      } catch (_) {
        break;
      }
    }
  }

  function start() {
    function apply() {
      root.document.documentElement.classList.toggle('dark', detectKoobooDark(root));
    }

    apply();
    observeThemeRoots(apply);
    root.addEventListener('storage', function (event) {
      if (event.key && /theme|color|scheme/i.test(event.key)) apply();
    });
    if (root.matchMedia) {
      root.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apply);
    }
  }

  root.KFileThemeSync = {
    detectKoobooDark: detectKoobooDark,
    start: start
  };
})();
