import { useReveal } from '../hooks/useReveal';

const steps = [
    {
        number: '01',
        title: 'Discovery',
        description:
            'Entendemos tu negocio, tus usuarios y tus objetivos. Definimos métricas de éxito.',
    },
    {
        number: '02',
        title: 'Design',
        description:
            'Diseñamos la experiencia y la arquitectura técnica. Prototipos navegables.',
    },
    {
        number: '03',
        title: 'Build',
        description:
            'Construimos en sprints cortos con entregas continuas. Calidad como default.',
    },
    {
        number: '04',
        title: 'Launch',
        description:
            'Lanzamos, medimos y iteramos. Acompañamiento técnico post-lanzamiento.',
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
                        Un proceso claro y predecible, con comunicación constante
                        y entregas que podés ver desde la primera semana.
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
