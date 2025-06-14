import { parseReceiptXML } from './parser';
import { saveToDB } from './db';
import { renderHtml } from './renderHtml';

export default {
  async fetch(request: Request, env: { DB: D1Database }) {
   if (request.method === 'GET') {
    const { results } = await env.DB.prepare(`
       SELECT 
          p.nome,
          p.prezzo,
          COALESCE(SUM(sp.quantita), 0) AS quantita_venduta,
          p.quantita_iniziale AS quantita_iniziale,
          p.quantita_iniziale - COALESCE(SUM(sp.quantita), 0) AS quantita_disponibile
        FROM 
          prodotti p
        LEFT JOIN 
          scontrino_prodotti sp ON p.id = sp.prodotto_id
        GROUP BY 
          p.id;
    `).all();
  
    return new Response(renderHtml(results), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' }
    });
  }

if (request.method === 'POST') {
      const xmlText = await request.text();
      console.log('XML arrivato:', xmlText);
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
    
