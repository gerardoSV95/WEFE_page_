import { useReveal } from '../hooks/useReveal';

const cards = [
    {
        title: 'Un dueño del proyecto, no un intermediario',
        description:
            'Tu primer contacto es un Project Manager dedicado con metodología sólida de Customer Success. Coordina entre tu negocio y los desarrolladores, traduce requerimientos a tareas concretas y mide adopción real — no solo entrega.',
    },
    {
        title: 'Cotización cerrada, sin sorpresas',
        description:
            'Te entregamos el alcance por escrito antes de empezar. Si algo cambia en el camino, lo conversamos antes de cobrarlo. Nunca recibes una factura con un "extra" al final del proyecto.',
    },
    {
        title: 'Entregas semanales, no slides',
        description:
            'Cada semana ves el avance corriendo en un entorno real — no diapositivas con porcentajes. Si algo no encaja, lo corregimos antes de que se acumule en deuda técnica.',
    },
];

const About = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="acerca"
            className={`about section reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">Por qué nosotros</span>
                    <h2>Tres compromisos que no negociamos.</h2>
                    <p className="about-intro">
                        No son slogans — son las reglas con las que trabajamos
                        en todos los proyectos, sin importar el tamaño. Si
                        alguna no encaja contigo, mejor no empezar.
                    </p>
                </div>

                <div className="grid-12">
                    {cards.map((card, idx) => (
                        <article
                            key={card.title}
                            className="about-card col-span-4"
                            style={{ transitionDelay: `${idx * 80}ms` }}
                        >
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
