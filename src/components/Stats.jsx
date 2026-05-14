import { useReveal } from '../hooks/useReveal';

const stats = [
    { value: '+50', label: 'Proyectos entregados' },
    { value: '12', unit: 'años', label: 'En el mercado' },
    { value: '98', unit: '%', label: 'Retención de clientes' },
    { value: '15', label: 'Industrias atendidas' },
];

const Stats = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="stats"
            className={`stats reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
        >
            <div className="container">
                <div className="grid-12">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat col-span-3">
                            <div className="stat-value">
                                {stat.value}
                                {stat.unit && <span className="unit">{stat.unit}</span>}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
