import { useReveal } from '../hooks/useReveal';

const Hero = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section id="inicio" className="hero" ref={ref}>
            <div className="container">
                <div className="grid-12">
                    <div className={`hero-content col-span-7 reveal${isVisible ? ' is-visible' : ''}`}>
                        <span className="eyebrow hero-eyebrow">
                            Consultora de desarrollo web
                        </span>
                        <h1 className="hero-title">
                            Construimos <span className="accent">software</span>
                            <br />
                            que tus clientes <span className="stroke">recordarán.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Diseñamos y desarrollamos productos web a medida —
                            rápidos, accesibles y escalables — para equipos que se
                            toman su tecnología en serio.
                        </p>
                        <div className="hero-ctas">
                            <a href="#contacto" className="btn-primary">
                                Iniciar proyecto
                                <span aria-hidden="true">→</span>
                            </a>
                            <a href="#portafolio" className="btn-ghost">
                                Ver portafolio
                            </a>
                        </div>
                        <span className="hero-badge">
                            Disponible para nuevos proyectos · Q3 2026
                        </span>
                    </div>

                    <aside
                        className={`hero-side col-span-5 reveal${isVisible ? ' is-visible' : ''}`}
                        style={{ transitionDelay: '120ms' }}
                        aria-hidden="true"
                    >
                        <div className="hero-side-number">
                            01
                            <small>Capítulo / Inicio</small>
                        </div>
                        <blockquote className="hero-pull">
                            <strong>+50 productos</strong>
                            entregados a startups y empresas establecidas
                            en los últimos 12 años.
                        </blockquote>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Hero;
