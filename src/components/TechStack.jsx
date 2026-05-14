import { useReveal } from '../hooks/useReveal';

const techs = [
    'React',
    'Laravel',
    'Tailwind CSS',
    'Bootstrap 5',
    'Flutter',
    'Java 21',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'MariaDB',
    'Figma',
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
                    <h2>Las herramientas que dominamos.</h2>
                </div>
                <div className="tech-list">
                    {techs.map((tech) => (
                        <span key={tech} className="tech-item">{tech}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
