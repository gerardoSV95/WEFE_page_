import { useReveal } from '../hooks/useReveal';

const cards = [
    {
        title: 'Misión',
        description:
            'Entregar productos web que resuelvan problemas reales — sin sobre-ingeniería, sin código inflado, sin sorpresas al final del proyecto.',
    },
    {
        title: 'Visión',
        description:
            'Ser el equipo técnico de confianza de empresas que valoran la calidad, la comunicación honesta y el resultado por encima del proceso.',
    },
    {
        title: 'Equipo',
        description:
            'Un grupo de 2 a 3 desarrolladores full-stack por proyecto. Quien te atiende, quien diseña y quien construye son las mismas personas.',
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
                    <span className="eyebrow">Acerca</span>
                    <h2>Un equipo pequeño. Un compromiso grande.</h2>
                    <p className="about-intro">
                        Cuando trabajas con W.E.F.E hablas directamente con las
                        personas que van a construir tu producto. Sin
                        intermediarios, sin mensajes perdidos, sin sorpresas.
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
