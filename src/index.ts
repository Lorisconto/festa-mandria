import { parseReceiptXML } from './parser';
import { saveToDB } from './db';
import { renderHtml } from './renderHtml';

export default {
  async fetch(request: Request, env: { DB: D1Database }) {
    // Handle GET: render HTML
    if (request.method === 'GET') {
      // Query all receipts (or adjust query as needed)
      const { results } = await env.DB.prepare('SELECT * FROM receipts').all();
      const content = JSON.stringify(results, null, 2);
      const html = renderHtml(content);
      return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      });
    }

    // Handle POST: ingest XML
    if (request.method === 'POST') {
      const xmlText = await request.text();
      let data;
      try {
        data = parseReceiptXML(xmlText);
      } catch (err) {
        return new Response('Bad XML format', { status: 400 });
      }
      await saveToDB(data, env.DB);
      return new Response('OK', { status: 200 });
    }

    // Method not allowed
    return new Response('Method Not Allowed', { status: 405 });
  }
};
