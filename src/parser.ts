// src/parser.ts
import { XMLParser } from 'fast-xml-parser';

export function parseReceiptXML(xmlText: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: true,
    trimValues: true,
  });
  const obj = parser.parse(xmlText);
  const ricevuta = obj.Ricevuta;
  return {
    id:       ricevuta.NumDocumento,
    dateTime: ricevuta.DataOra,
    total:    parseFloat(ricevuta.TotalCorrispettivo),
    lines: (Array.isArray(ricevuta.DettaglioRiga)
      ? ricevuta.DettaglioRiga
      : [ricevuta.DettaglioRiga]
    ).map(item => ({
      code:        item.CodiceProdotto,
      qty:         parseInt(item.Quantita, 10),
    }))
  };
}

