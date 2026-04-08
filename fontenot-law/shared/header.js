/* Fontenot Law — Shared Header
   Injected into <div id="site-header"></div> on every page */
(function () {
  var tel = 'tel:3375082627';
  var phoneSvg = '<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>';
  var arrowSvg = '<svg viewBox="0 0 24 24" style="width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2.5;margin-left:2px;transition:transform 0.2s;"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>';

  var loc = window.location.pathname;

  function isActive(href) {
    if (href === '/practice-areas/') return loc.indexOf('/practice-areas') === 0 || loc.indexOf('/personal-injury') === 0 || loc.indexOf('/family-law') === 0 || loc.indexOf('/criminal-law') === 0;
    if (href === '/about/') return loc.indexOf('/about') === 0;
    if (href === '/contact/') return loc.indexOf('/contact') === 0;
    return false;
  }
  function ac(href) { return isActive(href) ? ' active' : ''; }

  var html = '' +
    '<div class="call-bar"><a href="' + tel + '">' + phoneSvg + '(337) 508-2627</a></div>' +

    /* ── Dropdown CSS (injected once) ── */
    '<style>' +
    '.nav-dropdown{position:relative;}' +
    '.nav-dropdown-toggle{display:flex;align-items:center;cursor:pointer;}' +
    '.nav-dropdown-menu{display:none;position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:14px;z-index:200;min-width:600px;}' +
    '.nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown-menu:hover{display:block;}' +
    '.nav-dropdown:hover .nav-dropdown-toggle svg:last-child{transform:rotate(180deg);}' +
    '.ddm-inner{background:var(--navy-deep);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius);box-shadow:0 20px 60px rgba(0,0,0,0.35);padding:28px 32px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;}' +
    '.ddm-col h5{font-family:"Inter",sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}' +
    '.ddm-col ul{list-style:none;display:flex;flex-direction:column;gap:6px;}' +
    '.ddm-col a{font-family:"Inter",sans-serif;font-size:0.8rem;color:rgba(255,255,255,0.55);transition:color 0.15s;display:block;padding:2px 0;}' +
    '.ddm-col a:hover{color:var(--white);}' +
    '.ddm-col .ddm-overview{color:rgba(255,255,255,0.35);font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-top:8px;display:inline-block;border-top:1px solid rgba(255,255,255,0.08);padding-top:8px;}' +
    '.ddm-col .ddm-overview:hover{color:var(--gold);}' +

    /* Mobile dropdown */
    '.mob-menu .mob-dd-toggle{display:flex;align-items:center;justify-content:space-between;cursor:pointer;}' +
    '.mob-menu .mob-dd-toggle svg{width:12px;height:12px;stroke:rgba(255,255,255,0.5);fill:none;stroke-width:2.5;transition:transform 0.2s;}' +
    '.mob-menu .mob-dd-sub{display:none;padding:0 0 8px 16px;}' +
    '.mob-menu .mob-dd-sub.open{display:block;}' +
    '.mob-menu .mob-dd-sub a{font-size:0.85rem;padding:8px 0;color:rgba(255,255,255,0.55);border-bottom:none;}' +
    '.mob-menu .mob-dd-label{font-size:0.65rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);padding:10px 0 4px;display:block;}' +
    '@media(max-width:1024px){.nav-dropdown-menu{display:none!important;}}' +
    '</style>' +

    /* ── Nav bar ── */
    '<nav class="nav">' +
    '  <div class="nav-inner">' +
    '    <a href="/" class="nav-logo">Devin Fontenot<span>Attorney at Law &middot; Lake Charles, LA</span></a>' +
    '    <div class="nav-links">' +

    /* Practice Areas dropdown */
    '      <div class="nav-dropdown">' +
    '        <a href="/practice-areas/" class="nav-dropdown-toggle' + ac('/practice-areas/') + '">Practice Areas ' + arrowSvg + '</a>' +
    '        <div class="nav-dropdown-menu"><div class="ddm-inner">' +

    /* Col 1: Family Law */
    '          <div class="ddm-col"><h5>Family Law</h5><ul>' +
    '            <li><a href="/family-law/divorce-lawyer-lake-charles/">Divorce</a></li>' +
    '            <li><a href="/family-law/lake-charles-child-custody-attorney/">Child Custody</a></li>' +
    '            <li><a href="/family-law/child-support-lawyer-lake-charles/">Child Support</a></li>' +
    '            <li><a href="/family-law/adoption-lawyer-lake-charles/">Adoption</a></li>' +
    '            <li><a href="/family-law/prenuptial-agreements-lawyer-lake-charles/">Prenuptial Agreements</a></li>' +
    '            <li><a href="/family-law/protective-orders-lake-charles/">Protective Orders</a></li>' +
    '            <li><a href="/family-law/modifications-lake-charles/">Modifications</a></li>' +
    '            <li><a href="/family-law/community-property-partitions-lawyer-lake-charles/">Community Property</a></li>' +
    '            <li><a href="/family-law/contempt-court-lawyer-lake-charles/">Contempt of Court</a></li>' +
    '          </ul><a href="/family-law/" class="ddm-overview">All Family Law &rarr;</a></div>' +

    /* Col 2: Criminal Defense */
    '          <div class="ddm-col"><h5>Criminal Defense</h5><ul>' +
    '            <li><a href="/criminal-law/dwi-dui-lawyer-lake-charles/">DWI / DUI</a></li>' +
    '            <li><a href="/criminal-law/drug-offenses-lawyer-lake-charles/">Drug Offenses</a></li>' +
    '            <li><a href="/criminal-law/assault-battery-lawyer-lake-charles/">Assault &amp; Battery</a></li>' +
    '            <li><a href="/criminal-law/domestic-violence-lawyer-lake-charles/">Domestic Violence</a></li>' +
    '            <li><a href="/criminal-law/homicide-defense-lawyer-lake-charles/">Homicide</a></li>' +
    '            <li><a href="/criminal-law/sex-crimes-defense-lawyer-lake-charles/">Sex Crimes</a></li>' +
    '            <li><a href="/criminal-law/white-collar-crimes-lawyer-lake-charles/">White Collar</a></li>' +
    '            <li><a href="/criminal-law/juvenile-defense-lawyer-lake-charles/">Juvenile</a></li>' +
    '            <li><a href="/criminal-law/expungement-lawyer-lake-charles/">Expungement</a></li>' +
    '          </ul><a href="/criminal-law/" class="ddm-overview">All Criminal Defense &rarr;</a></div>' +

    /* Col 3: Personal Injury */
    '          <div class="ddm-col"><h5>Personal Injury</h5><ul>' +
    '            <li><a href="/personal-injury/car-accidents-lawyers-lake-charles/">Car Accidents</a></li>' +
    '            <li><a href="/personal-injury/truck-accident-lawyer-lake-charles/">Truck Accidents</a></li>' +
    '            <li><a href="/personal-injury/motorcycle-accidents-lawyer-lake-charles/">Motorcycle Accidents</a></li>' +
    '            <li><a href="/personal-injury/offshore-worker-injury-lawyer-lake-charles/">Offshore Injuries</a></li>' +
    '            <li><a href="/personal-injury/plant-explosion-lawyer-lake-charles/">Plant Explosions</a></li>' +
    '            <li><a href="/personal-injury/wrongful-death-lawyer-lake-charles/">Wrongful Death</a></li>' +
    '            <li><a href="/personal-injury/medical-malpractice-lawyer-lake-charles/">Medical Malpractice</a></li>' +
    '            <li><a href="/personal-injury/slip-fall-lawyer-lake-charles/">Slip &amp; Fall</a></li>' +
    '          </ul><a href="/personal-injury/" class="ddm-overview">All Personal Injury &rarr;</a></div>' +

    '        </div></div>' +
    '      </div>' +

    '      <a href="/about/"' + (ac('/about/') ? ' class="active"' : '') + '>About</a>' +
    '      <a href="/#reviews">Reviews</a>' +
    '      <a href="/contact/"' + (ac('/contact/') ? ' class="active"' : '') + '>Contact</a>' +
    '    </div>' +
    '    <a href="' + tel + '" class="btn btn-gold nav-cta">(337) 508-2627</a>' +
    '    <div class="nav-burger" onclick="document.getElementById(\'mob-menu\').classList.toggle(\'open\')"><span></span><span></span><span></span></div>' +
    '  </div>' +

    /* ── Mobile menu ── */
    '  <div class="mob-menu" id="mob-menu">' +
    '    <div class="mob-dd-toggle" onclick="var s=this.nextElementSibling;s.classList.toggle(\'open\');this.querySelector(\'svg\').style.transform=s.classList.contains(\'open\')?\'rotate(180deg)\':\'\';">Practice Areas <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></div>' +
    '    <div class="mob-dd-sub">' +
    '      <span class="mob-dd-label">Family Law</span>' +
    '      <a href="/family-law/divorce-lawyer-lake-charles/">Divorce</a>' +
    '      <a href="/family-law/lake-charles-child-custody-attorney/">Child Custody</a>' +
    '      <a href="/family-law/child-support-lawyer-lake-charles/">Child Support</a>' +
    '      <a href="/family-law/adoption-lawyer-lake-charles/">Adoption</a>' +
    '      <a href="/family-law/">All Family Law &rarr;</a>' +
    '      <span class="mob-dd-label">Criminal Defense</span>' +
    '      <a href="/criminal-law/dwi-dui-lawyer-lake-charles/">DWI / DUI</a>' +
    '      <a href="/criminal-law/drug-offenses-lawyer-lake-charles/">Drug Offenses</a>' +
    '      <a href="/criminal-law/assault-battery-lawyer-lake-charles/">Assault &amp; Battery</a>' +
    '      <a href="/criminal-law/domestic-violence-lawyer-lake-charles/">Domestic Violence</a>' +
    '      <a href="/criminal-law/">All Criminal Defense &rarr;</a>' +
    '      <span class="mob-dd-label">Personal Injury</span>' +
    '      <a href="/personal-injury/car-accidents-lawyers-lake-charles/">Car Accidents</a>' +
    '      <a href="/personal-injury/truck-accident-lawyer-lake-charles/">Truck Accidents</a>' +
    '      <a href="/personal-injury/offshore-worker-injury-lawyer-lake-charles/">Offshore Injuries</a>' +
    '      <a href="/personal-injury/">All Personal Injury &rarr;</a>' +
    '    </div>' +
    '    <a href="/about/">About</a>' +
    '    <a href="/#reviews">Reviews</a>' +
    '    <a href="/contact/">Contact</a>' +
    '    <a href="' + tel + '">(337) 508-2627</a>' +
    '  </div>' +
    '</nav>';

  var el = document.getElementById('site-header');
  if (el) el.innerHTML = html;

  /* Nav scroll shadow */
  window.addEventListener('scroll', function () {
    var nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 20);
  }, { passive: true });
})();
