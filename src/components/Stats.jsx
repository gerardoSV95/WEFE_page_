import { useReveal } from '../hooks/useReveal';

// Usage: <Stats metrics={[{ value, label, unit?, icon?, description? }]} />
const Stats = ({ metrics = [] }) => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="stats"
            className={`stats reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="grid-12">
                    {metrics.map((stat) => (
                        <article
                            key={stat.label}
                            className="stat col-span-3"
                            aria-label={`${stat.value}${stat.unit ? ' ' + stat.unit : ''} — ${stat.label}`}
                        >
                            {stat.icon && (
                                <span className="stat-icon" aria-hidden="true">
                                    {stat.icon}
                                </span>
                            )}
                            <div className="stat-value">
                                {stat.value}
                                {stat.unit && <span className="unit">{stat.unit}</span>}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                            {stat.description && (
                                <p className="stat-description">{stat.description}</p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
