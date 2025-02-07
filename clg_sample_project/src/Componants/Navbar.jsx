import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navStyle = {
        padding: '10px 20px',
        background: '#0571ab',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const ulStyle = {
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
        padding: 0
    };

    const liStyle = {
        margin: '0 10px'
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none'
    };

    return (
        <nav style={navStyle}>
            <div>Banking Loan App</div>
            <ul style={ulStyle}>           
                <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>
                <li style={liStyle}><Link to="/" style={linkStyle}>Loans</Link></li>
                <li style={liStyle}><Link to="/" style={linkStyle}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
