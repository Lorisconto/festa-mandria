async function saveToDB({ id, dateTime, total, lines }, RECEIPTS_DB) {
  // Inserimento scontrino
  await RECEIPTS_DB.prepare(`
    INSERT INTO receipts (id, date_time, total_amount)
    VALUES (?, ?, ?)
  `)
  .bind(id, dateTime, total)
  .run();

  // Inserimento righe
  for (const l of lines) {
    await RECEIPTS_DB.prepare(`
      INSERT INTO receipt_lines
        (receipt_id, product_code, description, quantity, unit_price, line_total)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(id, l.code, l.description, l.qty, l.unitPrice, l.lineTotal)
    .run();
  }
}
