import { Resend } from 'resend';

const MAX_BODY_BYTES = 16 * 1024;
const MESSAGE_MAX = 600;
const RATE_MAX = 5;
const RATE_WINDOW_MS = 60 * 1000;

const rateState = new Map();

const SITE_URL = 'https://ericnacif.dev';

const json = (statusCode, payload, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
  body: JSON.stringify(payload),
});

const clean = (value, max = 200) =>
  String(value ?? '')
    .replace(/[\r\n\t]+/gu, ' ')
    .trim()
    .slice(0, max);

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const clientIp = (event) => {
  const fwd = event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'];
  if (fwd) return fwd.split(',')[0].trim();
  return event.headers['client-ip'] || 'unknown';
};

const enforceRateLimit = (ip) => {
  if (ip === 'unknown') return true;
  const now = Date.now();
  const hits = (rateState.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateState.set(ip, hits);
    return false;
  }
  hits.push(now);
  rateState.set(ip, hits);
  return true;
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const fieldRow = (label, value, isLast) => `
  <tr>
    <td style="padding:16px 24px;${isLast ? '' : 'border-bottom:1px solid #eef1fb;'}vertical-align:top;">
      <p style="margin:0;font-family:${FONT};font-size:11px;font-weight:700;line-height:1.4;color:#8a93a8;text-transform:uppercase;letter-spacing:0.07em;">${escapeHtml(label)}</p>
      <p style="margin:7px 0 0;font-family:${FONT};font-size:15px;font-weight:500;line-height:1.6;color:#0b1020;white-space:pre-wrap;">${escapeHtml(value)}</p>
    </td>
  </tr>`;

const emailLayout = (heading, rowsHtml) => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2fb;-webkit-text-size-adjust:100%;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eef2fb;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:580px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(20,40,120,0.10);">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#3b5bff 0%,#7d93ff 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:34px 32px 26px;text-align:center;border-bottom:1px solid #eef1fb;">
              <a href="${SITE_URL}" style="text-decoration:none;display:inline-block;">
                <span style="font-family:${FONT};font-size:25px;font-weight:700;letter-spacing:-0.02em;color:#0b1020;">Eric Nacif<span style="color:#3b5bff;">.</span></span>
              </a>
              <p style="margin:7px 0 0;font-family:${FONT};font-size:12px;font-weight:500;line-height:1.4;color:#8a93a8;letter-spacing:0.02em;">
                Desenvolvedor Full Stack
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:30px 32px 12px;">
              <p style="margin:0 0 16px;">
                <span style="display:inline-block;padding:7px 15px;background:#eaeeff;color:#3b5bff;font-family:${FONT};font-size:12px;font-weight:700;line-height:1.4;border-radius:999px;letter-spacing:0.02em;">Novo contato</span>
              </p>
              <h1 style="margin:0 0 8px;font-family:${FONT};font-size:23px;font-weight:700;line-height:1.3;color:#0b1020;letter-spacing:-0.02em;">
                ${escapeHtml(heading)}
              </h1>
              <p style="margin:0 0 26px;font-family:${FONT};font-size:14px;line-height:1.55;color:#5a6377;">
                Você recebeu uma nova mensagem pelo formulário do site.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafbff;border:1px solid #eef1fb;border-radius:14px;overflow:hidden;border-collapse:separate;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:22px 32px 30px;text-align:center;">
              <p style="margin:0 0 6px;font-family:${FONT};font-size:13px;font-weight:600;line-height:1.5;">
                <a href="${SITE_URL}" style="color:#3b5bff;text-decoration:none;">ericnacif.dev</a>
              </p>
              <p style="margin:0;font-family:${FONT};font-size:11px;line-height:1.5;color:#a6adbd;">
                © ${year} Eric Nacif. Todos os direitos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const buildEmail = (fields, heading) => {
  const visible = fields.filter(([, value]) => value !== '');
  const rowsHtml = visible
    .map(([label, value], i) => fieldRow(label, value, i === visible.length - 1))
    .join('');
  const text = fields
    .filter(([, value]) => value !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  return { html: emailLayout(heading, rowsHtml), text };
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Methods': 'POST, OPTIONS' } };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'method_not_allowed' });
  }

  const rawBody = event.body || '';
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: 'payload_too_large' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }
  if (typeof payload !== 'object' || payload === null) {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  // Honeypot: campo "website" preenchido = bot. Responde sucesso sem enviar.
  if (payload.website) {
    return json(200, { ok: true, mailed: false, skipped: true });
  }

  if (!enforceRateLimit(clientIp(event))) {
    return json(429, { ok: false, error: 'rate_limited' }, { 'Retry-After': '60' });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 160);
  const message = clean(payload.message, MESSAGE_MAX);

  if (name.length < 2) return json(422, { ok: false, error: 'invalid_name' });
  if (!isValidEmail(email)) return json(422, { ok: false, error: 'invalid_email' });
  if (message.length < 1) return json(422, { ok: false, error: 'invalid_message' });

  const apiKey = process.env.RESEND_API_KEY;
  const mailFrom = process.env.MAIL_FROM;
  const mailTo = process.env.MAIL_TO;

  if (!apiKey || !mailFrom || !mailTo) {
    return json(503, { ok: false, error: 'mail_not_configured' });
  }

  const heading = `Nova mensagem de ${name}`;
  const { html, text } = buildEmail(
    [
      ['Nome', name],
      ['E-mail', email],
      ['Mensagem', message],
      ['Enviado em', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })],
    ],
    heading,
  );

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: `[Portfólio] Contato — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return json(502, { ok: false, error: 'mail_failed' });
    }

    return json(200, { ok: true, mailed: true });
  } catch (err) {
    console.error('Mail exception:', err);
    return json(502, { ok: false, error: 'mail_failed' });
  }
};
