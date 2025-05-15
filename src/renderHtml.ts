export function renderHtml(data: any[]) {
  const rows = data.map(row => `
    <tr>
      <td>${row.nome}</td>
      <td>${row.prezzo.toFixed(2)} €</td>
      <td>${row.quantita_venduta}</td>
      <td>${row.quantita_iniziale}</td>
      <td>${row.quantita_disponibile}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="it">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Festa di paese – Scontrini</title>
        <link rel="stylesheet" href="https://static.integrations.cloudflare.com/styles.css">
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }
          th, td {
            padding: 0.5rem;
            border: 1px solid #ccc;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <header>
          <img src="logo.png">
          <h1>📑 Elenco Prodotti Venduti</h1>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Prezzo</th>
                <th>Quantità venduta</th>
                <th>Quantità iniziale</th>
                <th>Disponibile</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </main>
      </body>
    </html>
  `;
}
