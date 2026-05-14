import { useState } from 'react';

const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#acerca', label: 'Acerca' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#portafolio', label: 'Portafolio' },
    { href: '#contacto', label: 'Contacto' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((open) => !open);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <a href="#inicio" onClick={closeMenu}>W.E.F.E</a>
                </div>
                <button
                    type="button"
                    className="menu-btn"
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                    aria-expanded={isMenuOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className={isMenuOpen ? 'none' : ''}
                    >
                        <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className={isMenuOpen ? '' : 'none'}
                    >
                        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                    </svg>
                </button>
                <nav className={`menu${isMenuOpen ? ' is-active' : ''}`}>
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} onClick={closeMenu}>
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
