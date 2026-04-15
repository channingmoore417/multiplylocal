(function() {
  var path = window.location.pathname.replace(/\/$/, '');

  function isActive(href) {
    if (href === 'pricing.html' && (path === '/pricing' || path === '/pricing.html')) return true;
    if (href === 'contact.html' && (path === '/contact' || path === '/contact.html')) return true;
    if (href === 'multiplyos.html' && (path === '/multiplyos' || path === '/multiplyos.html')) return true;
    if (href === 'blog.html' && (path === '/blog' || path === '/blog.html')) return true;
    return false;
  }

  function cls(href) {
    return isActive(href) ? ' class="active"' : '';
  }

  var html = '<header class="site-header">' +
    '<a href="/index.html" class="header-logo">MULTI<span class="x">\u00d7</span>PLY</a>' +
    '<nav><ul class="header-nav">' +
      '<li class="nav-dropdown"><a href="#">Services</a><div class="nav-dropdown-menu"><a href="/web-design/lake-charles.html">Web Design</a><a href="/seo/lake-charles.html">Local SEO</a><a href="/reputation/lake-charles.html">Reputation Management</a></div></li>' +
      '<li><a href="/multiplyos.html"' + cls('multiplyos.html') + '>MultiplyOS</a></li>' +
      '<li><a href="/pricing.html"' + cls('pricing.html') + '>Pricing</a></li>' +
      '<li><a href="/index.html#how-it-works">Process</a></li>' +
      '<li><a href="/blog.html"' + cls('blog.html') + '>Blog</a></li>' +
      '<li><a href="/contact.html"' + cls('contact.html') + '>Contact</a></li>' +
    '</ul></nav>' +
    '<a href="/book.html" class="header-cta">Multiply My Business</a>' +
    '<button class="hamburger" onclick="toggleMobileNav()" aria-label="Menu"><span></span><span></span><span></span></button>' +
  '</header>' +
  '<nav class="mobile-nav" id="mobileNav">' +
    '<a href="/web-design/lake-charles.html" onclick="toggleMobileNav()">Web Design</a>' +
    '<a href="/seo/lake-charles.html" onclick="toggleMobileNav()">Local SEO</a>' +
    '<a href="/reputation/lake-charles.html" onclick="toggleMobileNav()">Reputation Management</a>' +
    '<a href="/multiplyos.html" onclick="toggleMobileNav()">MultiplyOS</a>' +
    '<a href="/pricing.html" onclick="toggleMobileNav()">Pricing</a>' +
    '<a href="/index.html#how-it-works" onclick="toggleMobileNav()">Process</a>' +
    '<a href="/blog.html" onclick="toggleMobileNav()">Blog</a>' +
    '<a href="/contact.html" onclick="toggleMobileNav()">Contact</a>' +
    '<a href="/book.html" class="mobile-cta">Multiply My Business</a>' +
  '</nav>';

  var el = document.getElementById('global-header');
  if (el) el.innerHTML = html;

  window.toggleMobileNav = function() {
    document.getElementById('mobileNav').classList.toggle('open');
  };
  window.addEventListener('scroll', function() {
    var nav = document.getElementById('mobileNav');
    if (nav) nav.classList.remove('open');
  });
  // Meta Pixel
  if(!window.fbq){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','1276653241236782');
    fbq('track','PageView');
    var ns=document.createElement('noscript');
    ns.innerHTML='<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1276653241236782&ev=PageView&noscript=1"/>';
    document.body.appendChild(ns);
  }
})();
