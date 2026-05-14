import { useReveal } from '../hooks/useReveal';

const projects = [
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        title: 'Dashboard SaaS',
        description: 'Panel analítico en tiempo real para una startup fintech.',
        tags: ['React', 'TypeScript', 'PostgreSQL'],
        layout: 'col-span-7 aspect-16-10',
    },
    {
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
        title: 'Tienda Online',
        description: 'E-commerce con pasarela de pagos y panel de administración.',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        layout: 'col-span-5 aspect-4-5',
    },
    {
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80',
        title: 'Plataforma Educativa',
        description: 'LMS con cursos en video y seguimiento de progreso.',
        tags: ['React', 'Node.js', 'AWS'],
        layout: 'col-span-5 aspect-1-1',
    },
    {
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        title: 'App Corporativa',
        description: 'Intranet para gestión de proyectos y comunicación interna.',
        tags: ['Vue', 'Firebase'],
        layout: 'col-span-7 aspect-4-3',
    },
    {
        image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80',
        title: 'Landing Page',
        description: 'Sitio promocional optimizado para SEO y velocidad.',
        tags: ['Astro', 'Tailwind'],
        layout: 'col-span-7 aspect-3-4',
    },
    {
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
        title: 'API REST',
        description: 'Microservicio escalable con documentación interactiva.',
        tags: ['Node.js', 'Express', 'Swagger'],
        layout: 'col-span-5 aspect-16-9',
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
                    <h2>Trabajo seleccionado.</h2>
                    <p>
                        Una muestra de proyectos donde combinamos diseño,
                        ingeniería y producto para entregar resultados medibles.
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
