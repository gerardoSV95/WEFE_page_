import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const CONTACT_RECIPIENT =
    import.meta.env.VITE_CONTACT_RECIPIENT || 'wefe.info@gmail.com';
// In production use the direct formsubmit.co URL.
// In local dev, route through the Vite proxy (/formsubmit → formsubmit.co)
// so the browser never makes a cross-origin request and CORS is a non-issue.
const CONTACT_ENDPOINT = import.meta.env.DEV
    ? `/formsubmit/ajax/${CONTACT_RECIPIENT}`
    : `https://formsubmit.co/ajax/${CONTACT_RECIPIENT}`;

// Set VITE_CONTACT_MOCK=true in .env.local to skip the real network call
// and simulate a successful submission — useful when formsubmit.co is
// unreachable or during pure UI testing.
const CONTACT_MOCK = import.meta.env.VITE_CONTACT_MOCK === 'true';

const INITIAL_FORM = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const socials = [
    { label: 'GitHub', href: '#', icon: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' },
    { label: 'LinkedIn', href: '#', icon: 'M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z' },
    { label: 'X', href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

const Contact = () => {
    const { ref, isVisible } = useReveal();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponse(null);

        // Mock mode: skip the network call, simulate a 1.2 s round-trip.
        if (CONTACT_MOCK) {
            await new Promise((r) => setTimeout(r, 1200));
            setResponse({
                type: 'success',
                message:
                    '¡Gracias! Tu mensaje fue enviado. Te respondemos en menos de 24 horas.',
            });
            setFormData(INITIAL_FORM);
            setIsLoading(false);
            return;
        }

        try {
            const payload = new FormData(e.target);
            // Control fields para formsubmit.co.
            // Sobrescribimos cualquier valor accidental con append para
            // garantizar que estos lleguen siempre.
            payload.set(
                '_subject',
                `Nuevo contacto web · ${formData.subject || 'Sin asunto'}`,
            );
            payload.set('_template', 'table');
            payload.set('_captcha', 'false');
            // Honeypot ya viene incluido en el form (campo _honey).

            const res = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: payload,
            });

            if (!res.ok) throw new Error(`Error ${res.status}`);

            await res.json();
            setResponse({
                type: 'success',
                message:
                    '¡Gracias! Tu mensaje fue enviado. Te respondemos en menos de 24 horas.',
            });
            setFormData(INITIAL_FORM);
        } catch (err) {
            setResponse({
                type: 'error',
                message:
                    err.message ||
                    'Ocurrió un error al enviar, intenta nuevamente.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            id="contacto"
            className={`contact section reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="grid-12">
                    <div className="contact-info col-span-5">
                        <div className="section-heading">
                            <span className="eyebrow">Contacto</span>
                            <h2>Hablemos de tu próximo proyecto.</h2>
                        </div>
                        <h3>Email</h3>
                        <p>
                            <a href="mailto:wefe.info@gmail.com">
                                wefe.info@gmail.com
                            </a>
                        </p>
                        <h3>Ubicación</h3>
                        <p>Remoto · LATAM</p>
                        <h3>Redes</h3>
                        <nav className="social-media" aria-label="Redes sociales">
                            {socials.map((s) => (
                                <a key={s.label} href={s.href} aria-label={s.label}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d={s.icon} />
                                    </svg>
                                </a>
                            ))}
                        </nav>
                    </div>

                    <form
                        className="contact-form col-span-7"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {/* Honeypot: campo escondido. Los bots suelen llenarlo
                            y formsubmit descarta la submission. Humanos no lo
                            ven (sr-only + aria-hidden + tabIndex -1). */}
                        <input
                            type="text"
                            name="_honey"
                            tabIndex="-1"
                            autoComplete="off"
                            className="honeypot"
                            aria-hidden="true"
                        />

                        <label className="sr-only" htmlFor="contact-name">
                            Nombre
                        </label>
                        <input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label className="sr-only" htmlFor="contact-email">
                            Correo electrónico
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label className="sr-only" htmlFor="contact-subject">
                            Asunto
                        </label>
                        <input
                            id="contact-subject"
                            type="text"
                            name="subject"
                            placeholder="Asunto"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <label className="sr-only" htmlFor="contact-message">
                            Cuéntanos sobre tu proyecto
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            placeholder="Cuéntanos: qué necesitas, idea de timeline y rango de presupuesto."
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando…' : 'Enviar mensaje'}
                            {!isLoading && <span aria-hidden="true">→</span>}
                        </button>

                        {response && (
                            <p
                                className={`contact-form-response ${response.type}`}
                                role="status"
                                aria-live="polite"
                            >
                                {response.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
