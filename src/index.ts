import { parseReceiptXML } from './parser.js';
import { saveToDB } from './db.js';
import {renderHtml} from './renderHtml.ts';

export default {
  renderHtml();
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Use POST with XML payload', { status: 405 });
    }
    
    const xmlText = await request.text();
    let data;
    try {
      data = parseReceiptXML(xmlText);
    } catch (e) {
      return new Response('Invalid XML format', { status: 400 });
    }
    await saveToDB(data, env.RECEIPTS_DB);
    return new Response('OK', { status: 200 });
  }
};
