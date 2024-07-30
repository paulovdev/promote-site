import React from 'react';
import './Footer.scss';

const links = [
    {
        title: "Product",
        items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    {
        title: "Company",
        items: ["About us", "Careers", "Press", "News"],
    },
    {
        title: "Resource",
        items: ["Blog", "Newsletter", "Events", "Help center"],
    },
];


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <h5 >SitePromote</h5>
                    <div className="footer-links">
                        {links.map(({ title, items }) => (
                            <ul key={title} className="footer-link-group">
                                <li className="footer-link-title">{title}</li>
                                {items.map((link) => (
                                    <li key={link} className="footer-link-item">
                                        <a href="#" className="footer-link">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
