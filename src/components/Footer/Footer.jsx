import React from 'react';
import './Footer.scss';

const links = [{
    title: "Quimplo",
    items: []
},
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
}

];


const Footer = () => {
    return (
        <footer >
            <div className="container">
                <div className="footer-content">

                    <div className="footer-links">
                        {links.map(({ title, items }) => (
                            <ul key={title}>
                                <li className="footer-link-title">{title}</li>
                                {items.map((link) => (
                                    <li key={link} className="footer-link-item">
                                        <a href="#">{link}</a>
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
