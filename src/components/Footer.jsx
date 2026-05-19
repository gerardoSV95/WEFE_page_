const socials = [
    { label: 'GitHub', href: '#', icon: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' },
    { label: 'LinkedIn', href: '#', icon: 'M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z' },
    { label: 'X', href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

const quickLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#portafolio', label: 'Portafolio' },
    { href: '#faq', label: 'Preguntas frecuentes' },
    { href: '#contacto', label: 'Contacto' },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="grid-12">
                    <div className="col-span-5">
                        <div className="footer-brand-name">W.E.F.E</div>
                        <p>
                            Agencia de desarrollo web a medida. Construimos
                            productos digitales medibles, escalables y bien
                            diseñados.
                        </p>
                        <a href="#contacto" className="btn-primary footer-cta">
                            Iniciar proyecto
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    <div className="col-span-3 col-start-7">
                        <h4>Navegación</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-3">
                        <h4>Redes</h4>
                        <nav className="social-media" aria-label="Redes sociales">
                            {socials.map((social) => (
                                <a key={social.label} href={social.href} aria-label={social.label}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>&copy; {year} W.E.F.E. Todos los derechos reservados.</span>
                    <span>Hecho con cuidado en LATAM.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
