import React from 'react';
import './Footer.scss';
import ThemeChange from '../ThemeChange/ThemeChange';
import LanguageSelector from './../LanguageSelector/LanguageSelector';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2024 Quimplo. All rights reserved.</p>
                <ThemeChange />
                <LanguageSelector />
            </div>
        </footer>
    );
};

export default Footer;
