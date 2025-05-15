async function saveToDB({ id, dateTime, total, lines }, DB) {
  // Inserimento scontrino
  await DB.prepare(`
    INSERT INTO receipts (id, date_time, total_amount)
    VALUES (?, ?, ?)
  `)
  .bind(id, dateTime, total)
  .run();

  // Inserimento righe
  for (const l of lines) {
    await DB.prepare(`
      INSERT INTO receipt_lines
        (receipt_id, product_code, description, quantity, unit_price, line_total)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(id, l.code, l.description, l.qty, l.unitPrice, l.lineTotal)
    .run();
  }
}
