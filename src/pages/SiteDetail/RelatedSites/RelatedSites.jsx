import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowRightUpLine } from "react-icons/ri";

import "./RelatedSites.scss";

const RelatedSites = ({ relatedSites, category }) => {
    return (
        <section id='site-more-category'>
            <div className="sub-header-text" onClick={() => scrollTo({ top: 0 })}>
                <h2>Veja mais de <strong>{category}</strong></h2>
                <Link to={`/sites/${category}`}>Ver tudo <FaArrowRightLong /></Link>
            </div>

            <div className="related-sites">
                {relatedSites.map(relatedSite => (
                    <div key={relatedSite.id} className="related-site" style={{ content: "asd" }}>
                        <Link to={`/site/${relatedSite.id}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
                            <img src={relatedSite.imageURL} alt={relatedSite.siteName} />
                            <div className="related-site-text">
                                <h1>{relatedSite.siteName}</h1>
                                <p>{relatedSite.description}</p>
                                <span>Feito por {relatedSite.myName}</span>
                            </div>
                            <div className="view"><RiArrowRightUpLine /></div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedSites;
