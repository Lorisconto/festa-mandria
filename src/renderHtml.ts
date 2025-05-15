export function renderHtml(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="it">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Festa di paese – Scontrini</title>
        <link rel="stylesheet" href="https://static.integrations.cloudflare.com/styles.css">
        
      </head>
      <body>
        <header>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Logo_OpenAI.svg/512px-Logo_OpenAI.svg.png" alt="Test logo" width="150">

          <h1>📑 Elenco Scontrini</h1>
        </header>
        <main>
          <pre><code>${content}</code></pre>
        </main>
      </body>
    </html>`;
}
