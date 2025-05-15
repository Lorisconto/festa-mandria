// src/index.ts
import { parseReceiptXML } from './parser.js';
import { saveToDB } from './db.js';
import { renderHtml } from './renderHtml.ts';

export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      // … codice di ingest XML …
      return new Response('OK', { status: 200 });
    }
    // per le GET, restituisci la pagina HTML con i dati
    // 1) Leggi qualche dato da D1 (es. SELECT * FROM …)
    //const { results } = await env.RECEIPTS_DB.prepare('SELECT * FROM receipts').all();
    //const content = JSON.stringify(results, null, 2);
    const html = renderHtml(content);
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
};
