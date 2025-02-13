import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navStyle = {
        padding: '10px 20px',
        background: '#0571ab',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', // Added for wrapping the items on smaller screens
    };

    const ulStyle = {
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
        flexWrap: 'wrap', // Added to wrap the nav items on smaller screens
        justifyContent: 'flex-start', // Align links to the left by default
    };

    const liStyle = {
        margin: '0 10px',
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
    };

    // Inline styles for media queries (Note: we can't directly use media queries inline in JS, but we can set them dynamically with JavaScript or CSS-in-JS libraries).
    const mobileNavStyle = {
        flexDirection: 'column', // Stack items vertically on smaller screens
        alignItems: 'center', // Center-align the items when stacked
    };

    return (
        <nav style={navStyle}>
            <div>Banking Loan App</div>
            <ul style={ulStyle}>
                <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>
                <li style={liStyle}><Link to="/" style={linkStyle}>Loans</Link></li>
                <li style={liStyle}><Link to="/" style={linkStyle}>Contact</Link></li>
            </ul>

            {/* Adding media queries with inline styles */}
            <style>
                {`
                    @media (max-width: 768px) {
                        ${Object.keys(navStyle).map(key => `${key}: ${mobileNavStyle[key]};`).join(' ')}
                    }
                    @media (max-width: 480px) {
                        ${Object.keys(navStyle).map(key => `${key}: ${mobileNavStyle[key]};`).join(' ')}
                        ${Object.keys(ulStyle).map(key => `${key}: center;`).join(' ')}
                    }
                `}
            </style>
        </nav>
    );
};

export default Navbar;
