export function renderHtml(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="it">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Festa di paese – Scontrini</title>
        <link rel="stylesheet" href="https://static.integrations.cloudflare.com/styles.css">
        <img src="logo.png">
      </head>
      <body>
        <header>
          <h1>📑 Elenco Scontrini</h1>
        </header>
        <main>
          <pre><code>${content}</code></pre>
        </main>
      </body>
    </html>`;
}
