import React from 'react';
import './Footer.scss';
import ThemeChange from '../ThemeChange/ThemeChange';
import LanguageSelector from './../LanguageSelector/LanguageSelector';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2024 Quimplo. All rights reserved.</p>
                <Link to={"/cookies"} onClick={() => (scrollTo({ top: 0 }))}>{t('cookies.cookiePolicy')}</Link>
                <ThemeChange />
                <LanguageSelector />
            </div>
        </footer>
    );
};

export default Footer;
