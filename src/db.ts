// src/db.ts
export async function saveToDB(
  { id, dateTime, total, lines }: ReceiptData,
  DB: D1Database
) {
  // 1) Inserisci lo scontrino
  await DB.prepare(`
    INSERT INTO scontrini (id, data_ora)
    VALUES (?, ?)
  `)
    .bind(id, dateTime)
    .run();

  // 2) Per ogni riga, (opzionale upsert prodotto) e inserimento riga scontrino
  for (const r of lines) {
    // Se usi la tabella prodotti dinamica:
    // await DB.prepare(`
    //   INSERT OR IGNORE INTO prodotti (codice, nome, prezzo)
    //   VALUES (?, ?, ?)
    // `)
    // .bind(r.code, r.description, r.unitPrice)
    // .run();

    // Recupera l'ID del prodotto (se hai aggiunto codice in prodotti)
    // const { results } = await DB.prepare(`
    //   SELECT id FROM prodotti WHERE codice = ?
    // `).bind(r.code).all();
    // const prodottoId = results[0].id;

    // Oppure, se r.code è già un ID numerico:
    const prodottoId = parseInt(r.code, 10);

    await DB.prepare(`
      INSERT INTO scontrino_prodotti
        (scontrino_id, prodotto_id, quantita, prezzo_unitario, importo_totale)
      VALUES (?, ?, ?, ?, ?)
    `)
      .bind(
        id,
        prodottoId,
        r.qty,
        r.unitPrice,
        r.lineTotal
      )
      .run();
  }
}
