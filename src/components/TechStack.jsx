import { useReveal } from '../hooks/useReveal';

const groups = [
    {
        label: 'Frontend',
        items: ['React', 'Tailwind CSS'],
    },
    {
        label: 'Mobile',
        items: ['Flutter'],
    },
    {
        label: 'Backend',
        items: ['Laravel', 'Java 21'],
    },
    {
        label: 'Bases de datos',
        items: ['PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
        label: 'Diseño',
        items: ['Figma'],
    },
];

const TechStack = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="tecnologias"
            className={`tech-stack section bg-gray-light reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="section-heading text-center">
                    <span className="eyebrow">Stack</span>
                    <h2>El stack con el que construimos.</h2>
                    <p>
                        Elegimos cada herramienta según el problema, no según
                        la moda. Si tu proyecto necesita algo fuera de esta
                        lista, lo evaluamos contigo.
                    </p>
                </div>
                <div className="tech-groups">
                    {groups.map((group) => (
                        <div className="tech-group" key={group.label}>
                            <h3 className="tech-group-label">{group.label}</h3>
                            <ul className="tech-group-list">
                                {group.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
