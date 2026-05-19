import { useReveal } from '../hooks/useReveal';

const steps = [
    {
        number: '01',
        title: 'Entendemos',
        description:
            'Conocemos tu negocio, tus usuarios y tus objetivos. Definimos métricas claras de éxito antes de escribir una línea de código.',
    },
    {
        number: '02',
        title: 'Diseñamos',
        description:
            'Trazamos la experiencia y la arquitectura técnica. Prototipos navegables para validar contigo antes de construir.',
    },
    {
        number: '03',
        title: 'Construimos',
        description:
            'Desarrollamos en sprints cortos con entregas semanales. Ves el avance real, no slides de status.',
    },
    {
        number: '04',
        title: 'Lanzamos',
        description:
            'Publicamos, medimos resultados e iteramos. Acompañamiento técnico después del lanzamiento.',
    },
];

const Process = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="proceso"
            className={`process section reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">Proceso</span>
                    <h2>Cómo trabajamos contigo.</h2>
                    <p>
                        Un proceso claro y predecible, con comunicación
                        constante y entregas que puedes ver desde la primera
                        semana.
                    </p>
                </div>
                <div className="grid-12">
                    {steps.map((step, idx) => (
                        <article
                            key={step.number}
                            className="process-step col-span-3"
                            style={{ transitionDelay: `${idx * 80}ms` }}
                        >
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
