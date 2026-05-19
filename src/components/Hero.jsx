import { useReveal } from '../hooks/useReveal';

const Hero = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section id="inicio" className="hero" ref={ref}>
            <div className="container">
                <div className="grid-12">
                    <div className={`hero-content col-span-7 reveal${isVisible ? ' is-visible' : ''}`}>
                        <span className="eyebrow hero-eyebrow">
                            Agencia de desarrollo web · LATAM
                        </span>
                        <h1 className="hero-title">
                            Sistemas web <span className="accent">a medida</span>
                            <br />
                            para empresas, universidades y{' '}
                            <span className="stroke">gobierno.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Un PM dedicado coordina, los desarrolladores
                            construyen y tú ves avance real cada semana.
                            Cotización clara desde el día uno, sin sorpresas
                            al final del proyecto.
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
                            Disponible para proyectos nuevos · Hablemos esta semana
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
                            <strong>Tu proyecto no es un ticket.</strong>
                            Es el trabajo más importante que tenemos —
                            y lo tratamos como tal.
                        </blockquote>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Hero;
