/**
 * Bydlo — Fake Door Form Receiver
 *
 * Apps Script Web App, který přijímá POST z fake-door landing page
 * a appenduje řádek do Google Sheetu.
 *
 * Setup:
 * 1. Otevři Sheet, do kterého chceš zapisovat
 * 2. Extensions → Apps Script
 * 3. Vlož tento kód do Code.gs
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Zkopíruj Web app URL a vlož ji do index.html jako BYDLO_FORM_URL
 *
 * Stránka volá fetch s mode: 'no-cors' a Content-Type: text/plain,
 * aby se vyhnula CORS preflightu. Tělo je JSON v plain textu.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.ts || new Date().toISOString(),
      data.email || '',
      data.city || '',
      data.situation || '',
      data.message || '',
      data.page || '',
      data.referrer || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Volitelné: jednoduchý test, že Web App běží.
function doGet() {
  return ContentService
    .createTextOutput('Bydlo form receiver — OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
