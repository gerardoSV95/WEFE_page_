import { useReveal } from '../hooks/useReveal';

const projects = [
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        client: 'Universidad Tecnológica de Acapulco',
        title: 'Automatización Psicométrica',
        description:
            'Los estudiantes de la UTA completaban sus evaluaciones psicométricas en papel. Construimos el sistema que digitalizó todo el proceso: desde la aplicación del examen hasta la generación automática de resultados.',
        tags: ['Laravel', 'Bootstrap 5', 'MySQL'],
        layout: 'col-span-7 aspect-16-10',
    },
    {
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
        client: 'BUAP',
        title: 'Directorio de Investigadores',
        description:
            'Encontrar al asesor ideal para la tesis ya no dependía de preguntar de pasillo en pasillo. Creamos el portal donde los alumnos de la BUAP buscan investigadores por área, revisan sus publicaciones y eligen al docente que mejor encaja con su proyecto.',
        tags: ['Laravel', 'Blade', 'Tailwind CSS', 'PostgreSQL'],
        layout: 'col-span-5 aspect-4-5',
    },
    {
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        client: 'Gobierno del Estado de Puebla',
        title: 'Gestor de Contenido Gubernamental',
        description:
            'Detrás de la app turística oficial del Gobierno de Puebla hay un panel que construimos nosotros. Desde ahí, el equipo del gobierno publica hoteles, restaurantes, festivales y sitios emblemáticos de los Pueblos Mágicos — con imágenes — sin tocar una sola línea de código.',
        tags: ['React', 'Laravel', 'PostgreSQL'],
        layout: 'col-span-12 aspect-4-3',
    },
];

const Portfolio = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="portafolio"
            className={`portfolio section reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">Portafolio</span>
                    <h2>Nuestro trabajo.</h2>
                    <p>
                        Tres proyectos reales, entregados con dedicación total.
                        Cada uno refleja cómo trabajamos — con cuidado en cada detalle.
                    </p>
                </div>
                <div className="grid-12">
                    {projects.map((project, idx) => (
                        <a
                            href="#contacto"
                            key={project.title}
                            className={`portfolio-card ${project.layout}`}
                            style={{ transitionDelay: `${idx * 80}ms` }}
                            aria-label={`${project.title} — ${project.description}`}
                        >
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <div className="portfolio-card-info">
                                <span className="portfolio-client">{project.client}</span>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="portfolio-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="chip">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
