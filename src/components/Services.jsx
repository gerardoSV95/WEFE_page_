import { useReveal } from '../hooks/useReveal';

const services = [
    {
        title: 'Desarrollo Web',
        description:
            'Sistemas y plataformas web a medida — portales institucionales, paneles internos, integraciones con bases de datos y lógica de negocio compleja. Hemos entregado proyectos para universidades y gobierno. El tuyo es el siguiente.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm2 4v12h14V7H5zm2-2h10V4H7v1z" />
            </svg>
        ),
    },
    {
        title: 'Apps Móviles',
        description:
            'Una sola app, iOS y Android. Desarrollamos con Flutter para que no pagues dos equipos ni dos proyectos. Conectada a tu backend, con tu identidad visual y lista para escalar cuando tu negocio lo haga.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
            </svg>
        ),
    },
    {
        title: 'E-commerce',
        description:
            'Tiendas online construidas para vender, no para impresionar en el diseño y fallar en la caja. Catálogo de productos, pasarela de pagos, panel de administración propio y una experiencia de compra que no frustra a tus clientes.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0019.42 4H5.21L4.27 2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Asesoría Técnica',
        description:
            '¿Tienes una idea pero no sabes si es viable? ¿Un proyecto parado o un equipo que necesita dirección? Te ayudamos a elegir el stack correcto, estimar con honestidad y evitar los errores costosos antes de escribir la primera línea de código.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
        ),
    },
];

const Services = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="servicios"
            className={`services section bg-gray-light reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">Servicios</span>
                    <h2>En qué te podemos ayudar.</h2>
                    <p>
                        Cuatro áreas donde tenemos la experiencia técnica para
                        acompañarte — desde la primera conversación hasta el lanzamiento.
                    </p>
                </div>
                <div className="grid-12">
                    {services.map((service, idx) => (
                        <article
                            key={service.title}
                            className="service-card col-span-3"
                            style={{ transitionDelay: `${idx * 80}ms` }}
                        >
                            <span className="service-icon">{service.icon}</span>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
