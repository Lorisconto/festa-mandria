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
          <h1>📑 Festa Mandira - Inventario prodotti</h1>
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
