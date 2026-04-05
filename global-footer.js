(function() {
  var html = '<footer class="site-footer">' +
    '<div class="footer-inner">' +
      '<div class="footer-top">' +
        '<div>' +
          '<span class="f-logo">MULTI<span class="x">\u00d7</span>PLY</span>' +
          '<p class="f-tagline">We help local businesses get found online, convert more leads, and grow \u2014 all on autopilot.</p>' +
          '<div class="f-contact">' +
            '<div><a href="tel:+13375268824">(337) 526-8824</a></div>' +
            '<div>113 Williamsburg Street, Lake Charles, LA 70605</div>' +
            '<div style="margin-top:8px;font-size:11px;color:var(--gray-muted)">Multiply Local is a service provided by Amplify Marketing SEO LLC.</div>' +
          '</div>' +
        '</div>' +
        '<div class="f-col"><h4>Services</h4><ul>' +
          '<li><a href="/index.html#benefits">Website Design</a></li>' +
          '<li><a href="/index.html#benefits">Local SEO</a></li>' +
          '<li><a href="/index.html#benefits">Lead Automations</a></li>' +
          '<li><a href="/index.html#benefits">Review Management</a></li>' +
        '</ul></div>' +
        '<div class="f-col"><h4>Company</h4><ul>' +
          '<li><a href="/pricing.html">Pricing</a></li>' +
          '<li><a href="/index.html#how-it-works">How It Works</a></li>' +
          '<li><a href="/contact.html">Contact</a></li>' +
          '<li><a href="/book.html">Multiply My Business</a></li>' +
        '</ul></div>' +
        '<div class="f-col"><h4>Legal</h4><ul>' +
          '<li><a href="/privacy.html">Privacy Policy</a></li>' +
          '<li><a href="/terms.html">Terms of Use</a></li>' +
          '<li><a href="/privacy.html#sms">SMS Policy</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span class="f-copy">\u00a9 2026 Multiply Local LLC \u2014 All Rights Reserved</span>' +
        '<span class="f-bible">Be fruitful and multiply. \u2014 Genesis 1:28</span>' +
      '</div>' +
    '</div>' +
  '</footer>';

  var el = document.getElementById('global-footer');
  if (el) el.innerHTML = html;
})();
