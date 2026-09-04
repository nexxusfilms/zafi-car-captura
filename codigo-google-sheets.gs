/**
 * Zafi Car — recebe os leads da página de captura e grava na planilha.
 * Cole este código em: Extensões > Apps Script (dentro da sua planilha).
 * Depois: Implantar > Nova implantação > App da Web
 *   - Executar como: Eu
 *   - Quem pode acessar: Qualquer pessoa
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // evita duas gravações ao mesmo tempo

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.insertSheet('Leads');

    // Cria o cabeçalho na primeira vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'WhatsApp', 'Região', 'Perfil', 'Origem']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    var d = {};
    try { d = JSON.parse(e.postData.contents); } catch (err) {}

    sheet.appendRow([
      new Date(),
      d.nome || '',
      "'" + (d.telefone || ''), // aspa simples força texto (não perde o zero do DDD)
      d.regiao || '',
      d.perfil || '',
      d.origem || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Permite abrir a URL no navegador só para testar se está no ar.
function doGet() {
  return ContentService.createTextOutput('Zafi Car: endpoint ativo.');
}
