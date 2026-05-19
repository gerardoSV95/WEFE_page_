import { useReveal } from '../hooks/useReveal';

const clients = [
    { name: 'Universidad Tecnológica de Acapulco', short: 'UTA' },
    { name: 'Benemérita Universidad Autónoma de Puebla', short: 'BUAP' },
    { name: 'Gobierno del Estado de Puebla', short: 'Gob. Puebla' },
];

const ClientLogos = () => {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="clientes"
            className={`client-logos reveal${isVisible ? ' is-visible' : ''}`}
            ref={ref}
            aria-label="Instituciones que han trabajado con W.E.F.E"
        >
            <div className="container">
                <p className="client-logos-label">
                    Instituciones que han confiado en nosotros
                </p>
                <ul className="client-logos-list">
                    {clients.map((c) => (
                        <li key={c.short} title={c.name}>
                            <span className="client-logo-short">{c.short}</span>
                            <span className="client-logo-full">{c.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ClientLogos;
