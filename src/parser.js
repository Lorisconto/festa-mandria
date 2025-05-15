function parseReceiptXML(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  return {
    id:         doc.querySelector('NumDocumento')?.textContent,
    dateTime:   doc.querySelector('DataOra')?.textContent,
    total:      parseFloat(doc.querySelector('TotalCorrispettivo')?.textContent),
    lines: Array.from(doc.querySelectorAll('DettaglioRiga')).map(r => ({
      code:        r.querySelector('CodiceProdotto')?.textContent,
      description: r.querySelector('Descrizione')?.textContent,
      qty:         parseInt(r.querySelector('Quantita')?.textContent),
      unitPrice:   parseFloat(r.querySelector('PrezzoUnitario')?.textContent),
      lineTotal:   parseFloat(r.querySelector('ImportoTotale')?.textContent),
    }))
  };
}
