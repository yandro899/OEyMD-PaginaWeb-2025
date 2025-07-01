export function cargarHead() {
  const head = document.head;

  // --- Meta tags
  const metas = [
    { charset: 'UTF-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'generator', content: 'Mobirise v6.0.4, mobirise.com' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
    { name: 'description', content: '' }
  ];
  metas.forEach(attrs => {
    const meta = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => meta.setAttribute(k, v));
    head.appendChild(meta);
  });

  // --- Favicon
  const favicon = document.createElement('link');
  favicon.rel = 'shortcut icon';
  favicon.href = '/assets/images/photo-1544731612-de7f96afe55f.jpeg';
  favicon.type = 'image/x-icon';
  head.appendChild(favicon);

  // --- Stylesheets
  const styles = [
    '/assets/web//assets/mobirise-icons2/mobirise2.css',
    '/assets/bootstrap/css/bootstrap.min.css',
    '/assets/bootstrap/css/bootstrap-grid.min.css',
    '/assets/bootstrap/css/bootstrap-reboot.min.css',
    '/assets/dropdown/css/style.css',
    '/assets/socicon/css/styles.css',
    '/assets/theme/css/style.css',
    '/assets/mobirise/css/mbr-additional.css?v=mpoFio',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
  ];
  styles.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
  });

  // --- Preload Font
  const preloadFont = document.createElement('link');
  preloadFont.rel = 'preload';
  preloadFont.as = 'style';
  preloadFont.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700&display=swap&display=swap';
  preloadFont.onload = function () {
    this.rel = 'stylesheet';
  };
  head.appendChild(preloadFont);

  // --- Noscript fallback
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700&display=swap&display=swap">`;
  head.appendChild(noscript);

  // --- Custom Style
  const style = document.createElement('style');
  style.textContent = `
    .navbar-logo img {
      height: 4.3rem;
    }
    #chat {
      height: 50px;
      width: 50px;
    }
    #chat img {
      height: 50px;
      width: 50px;
    }
    #chatIA .modal-content {
      height: 350px;
    }
    .mbr-section-btn img {
      width: 10px;
      height: 40px;
    }
  `;
  head.appendChild(style);
}
