(function() {
  const storageKey = 'directo_lang';
  const config = {
    'en': { dir: 'ltr' },
    'ar': { dir: 'rtl' }
  };
  
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved && config[saved]) {
      document.documentElement.dir = config[saved].dir;
      document.documentElement.lang = saved;
    }
  } catch (e) {}
})();
