// ============================================================
// MULTIPLY LOCAL — Onboarding Form Handler
// ============================================================
// 1. Go to script.google.com → New Project
// 2. Paste this entire file, replacing the default code
// 3. Click Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the Web App URL and paste it into all three
//    onboarding forms where it says APPS_SCRIPT_URL
// ============================================================

var PARENT_FOLDER_ID = '1UfHtfA0vKL-Wvz85UZznGW7Rdtj0HLO9';
var GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/rqfDKEvso1ofKq2wgy5d/webhook-trigger/a53c3bf5-9c17-4277-819f-375d5469de00';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // --- Create client folder ---
    var parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);
    var folderName = (data.biz_name || 'New Client').toString().trim();
    var clientFolder = parentFolder.createFolder(folderName);

    // --- Create Google Doc ---
    var doc = DocumentApp.create(folderName + ' — Onboarding');
    DriveApp.getFileById(doc.getId()).moveTo(clientFolder);
    var body = doc.getBody();

    // Title
    body.appendParagraph(folderName + ' — Onboarding').setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph('Plan: ' + (data.form_source || '') + '   |   Submitted: ' + new Date().toLocaleString('en-US'));
    body.appendHorizontalRule();

    // Business Info
    appendSection(body, 'Business Info');
    appendField(body, 'Business Name', data.biz_name);
    appendField(body, 'Industry', data.industry);
    appendField(body, 'Owner Name', [data.first_name, data.last_name].filter(Boolean).join(' '));
    appendField(body, 'Title', data.owner_title);
    appendField(body, 'Email', data.email);
    appendField(body, 'Phone', data.phone);
    appendField(body, 'Address', data.address);
    appendField(body, 'Service Area', data.service_area);
    appendField(body, 'Business Hours', data.hours);

    // A2P
    appendSection(body, 'Business Verification (A2P)');
    appendField(body, 'Legal Business Name', data.legal_biz_name);
    appendField(body, 'EIN / Tax ID', data.ein);
    appendField(body, 'Business Structure', data.biz_structure);
    appendField(body, 'State of Registration', data.biz_state);

    // Website
    appendSection(body, 'Website');
    appendField(body, 'Existing URL', data.existing_url);
    appendField(body, 'Services', data.services);
    appendField(body, 'Differentiator', data.differentiator);
    appendField(body, 'Has Logo', data.has_logo);
    appendField(body, 'Color Preferences', data.colors);

    // Automations
    appendSection(body, 'Automations Setup');
    appendField(body, 'Missed Call Text-Back', data.textback_msg);
    appendField(body, 'Chat Widget Name', data.chat_name);
    appendField(body, 'Google Business Profile URL', data.gmb_url);
    appendField(body, 'Review Trigger', data.review_trigger);

    // Local SEO (Growth + Pro)
    if (data.top_services || data.primary_city) {
      appendSection(body, 'Local SEO Setup');
      appendField(body, 'Top Services to Rank For', data.top_services);
      appendField(body, 'Primary City', data.primary_city);
      appendField(body, 'Secondary Cities', data.secondary_cities);
      appendField(body, 'GBP Access', data.gmb_access);
    }

    // Email & Text Automations (Growth + Pro)
    if (data.lead_sources || data.sales_process) {
      appendSection(body, 'Email & Text Automations');
      appendField(body, 'Lead Sources', data.lead_sources);
      appendField(body, 'Sales Process', data.sales_process);
      appendField(body, 'Sales Cycle', data.sales_cycle);
    }

    // Ads & Payments (Pro only)
    if (data.google_ads || data.fb_ads) {
      appendSection(body, 'Ad Campaigns & Payments');
      appendField(body, 'Google Ads Account', data.google_ads);
      appendField(body, 'Facebook Ads Account', data.fb_ads);
      appendField(body, 'Monthly Ad Budget', data.ad_budget);
      appendField(body, 'Ad Goal', data.ad_goal);
      appendField(body, 'Online Payments', data.payments);
    }

    // Platform Access
    appendSection(body, 'Platform Access');
    appendField(body, 'MultiplyOS Login Email', data.platform_email);
    appendField(body, 'SMS Number', data.sms_number);
    appendField(body, 'Domain', data.domain);
    appendField(body, 'Notes', data.notes);

    // Team Members
    if (data.teammates) {
      appendSection(body, 'Team Members');
      try {
        var teammates = JSON.parse(data.teammates);
        teammates.forEach(function(t, i) {
          appendField(body, 'Teammate ' + (i + 1), [t.name, t.email, t.phone].filter(Boolean).join('  |  '));
        });
      } catch (err) {
        body.appendParagraph(data.teammates.toString());
      }
    }

    doc.saveAndClose();

    // --- Forward to GHL ---
    UrlFetchApp.fetch(GHL_WEBHOOK, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(data),
      muteHttpExceptions: true
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, folder: clientFolder.getUrl(), doc: 'https://docs.google.com/document/d/' + doc.getId() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function appendSection(body, title) {
  body.appendParagraph('');
  body.appendParagraph(title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
}

function appendField(body, label, value) {
  if (!value || value.toString().trim() === '') return;
  var p = body.appendParagraph('');
  p.appendText(label + ':  ').setBold(true);
  p.appendText(value.toString().trim()).setBold(false);
}
