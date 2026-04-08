/* Fontenot Law — Shared Footer
   Injected into <div id="site-footer"></div> on every page */
(function () {
  var year = new Date().getFullYear();

  var html = '' +
    '<footer class="footer">' +
    '  <div class="container">' +
    '    <div class="footer-grid">' +
    '      <div class="f-brand">' +
    '        <div class="f-brand-name">Devin Fontenot</div>' +
    '        <div class="f-brand-sub">Attorney at Law &middot; Lake Charles, Louisiana</div>' +
    '        <p>Personal injury, family law, and criminal defense attorneys serving Lake Charles, Calcasieu Parish, and Southwest Louisiana.</p>' +
    '        <p style="margin-top:8px;">2706 Hodges Street &middot; Lake Charles, LA 70601 &middot; <a href="tel:3375082627" style="color:rgba(255,255,255,0.45);">(337) 508-2627</a></p>' +
    '        <p class="f-disc">The information on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is created by contacting this firm.</p>' +
    '      </div>' +
    '      <div class="f-col">' +
    '        <h4>Personal Injury</h4>' +
    '        <ul>' +
    '          <li><a href="/personal-injury/car-accidents-lawyers-lake-charles/">Car Accidents</a></li>' +
    '          <li><a href="/personal-injury/truck-accident-lawyer-lake-charles/">Truck Accidents</a></li>' +
    '          <li><a href="/personal-injury/motorcycle-accidents-lawyer-lake-charles/">Motorcycle Accidents</a></li>' +
    '          <li><a href="/personal-injury/offshore-worker-injury-lawyer-lake-charles/">Offshore Injuries</a></li>' +
    '          <li><a href="/personal-injury/plant-explosion-lawyer-lake-charles/">Plant Explosions</a></li>' +
    '          <li><a href="/personal-injury/wrongful-death-lawyer-lake-charles/">Wrongful Death</a></li>' +
    '          <li><a href="/personal-injury/medical-malpractice-lawyer-lake-charles/">Medical Malpractice</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div class="f-col">' +
    '        <h4>Other Practice Areas</h4>' +
    '        <ul>' +
    '          <li><a href="/family-law/">Family Law</a></li>' +
    '          <li><a href="/family-law/divorce-lawyer-lake-charles/">Divorce</a></li>' +
    '          <li><a href="/family-law/lake-charles-child-custody-attorney/">Child Custody</a></li>' +
    '          <li><a href="/criminal-law/">Criminal Defense</a></li>' +
    '          <li><a href="/criminal-law/dwi-dui-lawyer-lake-charles/">DWI / DUI</a></li>' +
    '          <li><a href="/criminal-law/expungement-lawyer-lake-charles/">Expungement</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div class="f-col">' +
    '        <h4>Firm</h4>' +
    '        <ul>' +
    '          <li><a href="/about/">About the Firm</a></li>' +
    '          <li><a href="/practice-areas/">All Practice Areas</a></li>' +
    '          <li><a href="/contact/">Contact</a></li>' +
    '          <li><a href="/">Home</a></li>' +
    '        </ul>' +
    '      </div>' +
    '    </div>' +
    '    <div class="f-bottom">' +
    '      <p>&copy; ' + year + ' Devin Fontenot, Attorney at Law. All rights reserved. Lake Charles, Louisiana.</p>' +
    '      <div class="f-links"><a href="/privacy/">Privacy Policy</a><a href="/disclaimer/">Disclaimer</a></div>' +
    '    </div>' +
    '  </div>' +
    '</footer>';

  var el = document.getElementById('site-footer');
  if (el) el.innerHTML = html;
})();
