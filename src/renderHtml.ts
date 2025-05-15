export function renderHtml(data: any[]) {
  const rows = data.map(row => `
    <tr>
      <td>${row.nome}</td>
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
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #fafafa;
    border-bottom: 1px solid #ddd;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .reload-button {
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .reload-button:hover {
    background-color: #005dc1;
  }

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
        <img src="data:image/png;base64,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" alt="Logo" style="height: 40px; border-radius: 6px;">
          <h1>📑 Festa Mandria - Inventario prodotti</h1>
          <button class="reload-button" onclick="window.location.reload()">🔄 Ricarica</button>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
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
