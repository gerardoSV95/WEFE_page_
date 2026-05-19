/**
 * Vercel Serverless Function — /api/contact
 *
 * Proxies the contact form to formsubmit.co from the server side so the
 * browser never makes a cross-origin request (formsubmit.co does not send
 * reliable CORS headers from client-side fetches).
 *
 * Expected body (JSON): { name, email, subject, message }
 *
 * NOTE: formsubmit.co's /ajax/ endpoint does NOT accept application/json.
 * Must send as application/x-www-form-urlencoded.
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

    // formsubmit.co requires form-urlencoded, not JSON.
    const params = new URLSearchParams({
        name,
        email,
        subject: subject || '',
        message,
        _subject: `Nuevo contacto web · ${subject || 'Sin asunto'}`,
        _template: 'table',
        _captcha: 'false',
    });

    try {
        const upstream = await fetch(
            `https://formsubmit.co/ajax/${recipient}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                },
                body: params.toString(),
            },
        );

        // 403 from formsubmit.co usually means the email hasn't been
        // activated yet. The first submission triggers the activation email —
        // tell the user to check their inbox.
        if (upstream.status === 403) {
            return res.status(200).json({
                success: false,
                activation: true,
                message:
                    'Revisa la bandeja de wefe.info@gmail.com: formsubmit.co enviará un correo de activación. Haz clic en el enlace y vuelve a intentarlo.',
            });
        }

        const data = await upstream.json().catch(() => ({}));
        return res.status(upstream.ok ? 200 : upstream.status).json(data);
    } catch (err) {
        return res
            .status(500)
            .json({ error: err.message || 'Error interno del servidor.' });
    }
}
