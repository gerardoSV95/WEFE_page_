import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const faqs = [
    {
        q: '¿Cuánto cuesta un proyecto?',
        a: 'Cada proyecto se cotiza a medida. Un sitio web informativo arranca desde rangos accesibles; un sistema con paneles, integraciones y lógica de negocio se cotiza por alcance. Lo que sí garantizamos es una cotización por escrito, sin sorpresas: si algo sale del alcance, lo conversamos antes de cobrarlo.',
    },
    {
        q: '¿Cuánto tarda en construirse?',
        a: 'Un MVP funcional suele tomar entre 4 y 12 semanas según complejidad. Trabajamos en sprints semanales con entregas continuas, así que ves avance real desde la primera semana, no al final del proyecto.',
    },
    {
        q: '¿Trabajan por hora o por proyecto?',
        a: 'Por defecto cotizamos por proyecto con alcance cerrado. Así sabes desde el inicio cuánto vas a invertir. Para mantenimiento, evoluciones o consultoría puntual también ofrecemos modalidad por hora o paquete mensual.',
    },
    {
        q: '¿Qué pasa después del lanzamiento?',
        a: 'No desaparecemos. Incluimos un período de garantía sobre lo construido y ofrecemos paquetes de soporte y evolución mensual para que tu producto siga creciendo. La decisión de seguir con nosotros es tuya, no estás amarrado a un contrato a largo plazo.',
    },
    {
        q: '¿Atienden clientes fuera de México?',
        a: 'Sí. Trabajamos en remoto con clientes de toda Latinoamérica y también con clientes en habla hispana de Estados Unidos. Coordinamos en tu zona horaria y la comunicación es directa con quien construye tu producto.',
    },
    {
        q: '¿Quién es dueño del código?',
        a: 'Tú. Cuando termina el proyecto el código, el diseño y los accesos quedan a tu nombre. Sin licencias atadas, sin dependencias de nosotros para mover el producto a otro equipo si así lo decides.',
    },
];

const Faq = () => {
    const { ref, isVisible } = useReveal();
    const [openIdx, setOpenIdx] = useState(0);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    return (
        <section
            id="faq"
            className={`faq section bg-gray-light reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">Preguntas</span>
                    <h2>Lo que más nos preguntan.</h2>
                    <p>
                        Si tu duda no está aquí,{' '}
                        <a href="#contacto">escríbenos</a> — respondemos en
                        menos de 24 horas.
                    </p>
                </div>

                <ul className="faq-list">
                    {faqs.map((f, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <li
                                key={f.q}
                                className={`faq-item${isOpen ? ' is-open' : ''}`}
                            >
                                <button
                                    type="button"
                                    className="faq-question"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${idx}`}
                                    onClick={() =>
                                        setOpenIdx(isOpen ? -1 : idx)
                                    }
                                >
                                    <span>{f.q}</span>
                                    <span className="faq-icon" aria-hidden="true">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div
                                    id={`faq-panel-${idx}`}
                                    className="faq-answer"
                                    role="region"
                                    hidden={!isOpen}
                                >
                                    <p>{f.a}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </section>
    );
};

export default Faq;
