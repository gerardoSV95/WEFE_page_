import { useReveal } from '../hooks/useReveal';

const cards = [
    {
        title: 'Misión',
        description:
            'Acompañar a empresas y emprendedores en su transformación digital construyendo productos web confiables y escalables.',
    },
    {
        title: 'Visión',
        description:
            'Ser la consultora de referencia en desarrollo web, reconocida por la calidad técnica y el compromiso con cada proyecto.',
    },
    {
        title: 'Equipo',
        description:
            'Desarrolladores full-stack, diseñadores y consultores que combinan experiencia técnica con visión de negocio.',
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
                    <h2>Una agencia con mentalidad de producto.</h2>
                    <p className="about-intro">
                        No solo escribimos código: pensamos en el negocio, en
                        los usuarios y en el largo plazo de cada decisión técnica.
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
