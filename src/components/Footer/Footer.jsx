import React from 'react';
import './Footer.scss';
import ThemeChange from '../ThemeChange/ThemeChange';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2024 Quimplo. All rights reserved.</p>
                <ThemeChange />
            </div>
        </footer>
    );
};

export default Footer;
