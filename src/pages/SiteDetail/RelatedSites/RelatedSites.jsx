import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import "./RelatedSites.scss";

const RelatedSites = ({ relatedSites, category }) => {
    return (
        <section id='site-more-category'>
            <div className="sub-header-text" onClick={() => scrollTo({ top: 0 })}>
                <h2>More from <strong>{category}</strong></h2>
                <Link to={`/sites/${category}`}>View all <FaArrowRightLong /></Link>
            </div>

            <div className="related-sites">
                {relatedSites.map(relatedSite => (
                    <div key={relatedSite.id} className="related-site">
                        <Link to={`/site/${relatedSite.id}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
                            <img src={relatedSite.imageURL} alt={relatedSite.siteName} />
                            <h1>{relatedSite.siteName}</h1>
                            <p>{relatedSite.description}</p>
                            <p>Created by: {relatedSite.myName}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedSites;
