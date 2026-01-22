function loadJS(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();///s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.onload = () => resolve();///l.onload = resolve;
    l.onerror = reject;
    document.head.appendChild(l);
  });
}

async function loadAllAssets() {
  ///await loadCSS('https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css');
  ///await loadJS('https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js');
  ///await loadJS('/js/map-widget.js');
  await loadCSS('https://copyright.nins.cc/children/0001/nins-zzz.css');  ///pirozu
  await loadJS('https://copyright.nins.cc/children/0001/nins-update.js');
  await loadJS('https://copyright.nins.cc/children/0001/nins-world.js');
  ///await loadJS('https://copyright.nins.cc/children/0001/nins-ads.js');
  ///await loadJS('https://copyright.nins.cc/children/0001/nins-translate.js');
  ///await loadJS('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
}

loadAllAssets().then(() => initWidget());
