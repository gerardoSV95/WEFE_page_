/**
 * Vercel Serverless Function — /api/contact
 *
 * Proxies the contact form to formsubmit.co from the server side so the
 * browser never makes a cross-origin request (formsubmit.co does not send
 * reliable CORS headers from client-side fetches).
 *
 * Expected body (JSON): { name, email, subject, message }
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const recipient =
        process.env.VITE_CONTACT_RECIPIENT || 'wefe.info@gmail.com';

    const { name, email, subject, message } = req.body ?? {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Campos requeridos faltantes.' });
    }

    try {
        const upstream = await fetch(
            `https://formsubmit.co/ajax/${recipient}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    _subject: `Nuevo contacto web · ${subject || 'Sin asunto'}`,
                    _template: 'table',
                    _captcha: 'false',
                }),
            },
        );

        const data = await upstream.json().catch(() => ({}));
        return res.status(upstream.status).json(data);
    } catch (err) {
        return res
            .status(500)
            .json({ error: err.message || 'Error interno del servidor.' });
    }
}
