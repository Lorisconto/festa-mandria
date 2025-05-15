import { parseReceiptXML } from './parser';
import { saveToDB } from './db';
import { renderHtml } from './renderHtml';

export default {
  async fetch(request: Request, env: { DB: D1Database }) {
    if (request.method === 'GET') {
      // Un semplice join per mostrare tutto
      const { results } = await env.DB.prepare(`
        SELECT * from scontrino_prodotti
      `).all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      });
    }

    if (request.method === 'POST') {
      const xmlText = await request.text();
      let data;
      try {
        data = parseReceiptXML(xmlText);
      } catch (err) {
        return new Response('Bad XML format', { status: 400 });
      }
      
      //stampa di data per debug
      console.log('Parsed data:', JSON.stringify(data, null, 2));
      await saveToDB(data, env.DB);
      return new Response('OK', { status: 200 });
    }

    return new Response('Method Not Allowed', { status: 405 });
  }
};
