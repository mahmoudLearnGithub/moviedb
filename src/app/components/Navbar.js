// Navbar.js

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-md 
        navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link href="/" passHref>
                    <div className="navbar-brand" 
                    style={{ textDecoration: 'none', color: 'white' }}>
                        MovieDB
                    </div>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-controls="navbarNav"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
            </div>
        </nav>
    );
};

export default Navbar;
