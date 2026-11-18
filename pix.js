// Gerador de BR Code (Pix) — padrão EMV QR Code.
// Especificação: Manual do BR Code — Bacen.
(function (global) {
  'use strict';

  function field(id, value) {
    const len = String(value.length).padStart(2, '0');
    return id + len + value;
  }

  // CRC16/CCITT-FALSE (polinômio 0x1021, initial 0xFFFF, big-endian)
  function crc16(payload) {
    let crc = 0xffff;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  // Normaliza nome/cidade: remove acentos, limita tamanho, uppercase opcional
  function normalize(str, maxLen) {
    const out = str
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // remove diacríticos
      .replace(/[^\x20-\x7E]/g, '')      // remove não-ASCII restante
      .trim();
    return maxLen ? out.slice(0, maxLen) : out;
  }

  function buildPixPayload({ key, name, city, amount, txid }) {
    const merchant = field('00', 'br.gov.bcb.pix') + field('01', key);
    const additional = field('05', txid || '***');
    const nameN = normalize(name, 25);
    const cityN = normalize(city, 15).toUpperCase();

    const amountStr =
      amount && Number(amount) > 0 ? Number(amount).toFixed(2) : null;

    let payload =
      field('00', '01') +                 // Payload Format Indicator
      field('26', merchant) +             // Merchant Account Info (Pix)
      field('52', '0000') +               // MCC
      field('53', '986') +                // Moeda (BRL)
      (amountStr ? field('54', amountStr) : '') +
      field('58', 'BR') +                 // País
      field('59', nameN) +                // Nome do recebedor
      field('60', cityN) +                // Cidade
      field('62', additional) +           // Additional Data
      '6304';                              // CRC placeholder

    const crc = crc16(payload);
    return payload + crc;
  }

  global.PixBuilder = { buildPixPayload };
})(window);
