/**
 * Vercel Serverless Function — /api/contact
 *
 * Sends contact form submissions via Gmail SMTP using Nodemailer.
 * No third-party form service — direct and reliable.
 *
 * Required environment variables (set in Vercel → Project Settings → Env vars):
 *   VITE_CONTACT_RECIPIENT  — Gmail address that sends and receives (wefe.info@gmail.com)
 *   GMAIL_APP_PASSWORD      — 16-char App Password from Google Account → Security →
 *                             2-Step Verification → App Passwords
 */
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body ?? {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Campos requeridos faltantes.' });
    }

    const recipient =
        process.env.VITE_CONTACT_RECIPIENT || 'wefe.info@gmail.com';
    const appPassword = process.env.GMAIL_APP_PASSWORD;

    if (!appPassword) {
        console.error('GMAIL_APP_PASSWORD env var is not set');
        return res
            .status(500)
            .json({ error: 'Configuración de email incompleta en el servidor.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: recipient, pass: appPassword },
    });

    // Sanitize inputs to avoid HTML injection in the email body.
    const esc = (str) =>
        String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    try {
        await transporter.sendMail({
            from: `"WEFE Contacto" <${recipient}>`,
            to: recipient,
            replyTo: `"${esc(name)}" <${esc(email)}>`,
            subject: `Nuevo contacto web · ${esc(subject) || 'Sin asunto'}`,
            html: `
                <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">
                    <tr><td style="color:#555;width:100px"><strong>Nombre</strong></td><td>${esc(name)}</td></tr>
                    <tr><td style="color:#555"><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
                    <tr><td style="color:#555"><strong>Asunto</strong></td><td>${esc(subject) || '—'}</td></tr>
                    <tr><td style="color:#555;vertical-align:top"><strong>Mensaje</strong></td><td style="white-space:pre-wrap">${esc(message)}</td></tr>
                </table>
            `,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('nodemailer error:', err);
        return res
            .status(500)
            .json({ error: 'No se pudo enviar el email. Intenta nuevamente.' });
    }
}
