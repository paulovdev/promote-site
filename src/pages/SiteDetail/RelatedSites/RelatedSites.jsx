import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

import "./RelatedSites.scss";

const RelatedSites = ({ relatedSites, category }) => {
    const { t } = useTranslation();

    return (
        <section id='site-more-category'>
            <div className="sub-header-text" onClick={() => scrollTo({ top: 0 })}>
                <h2>{t('relatedSites.subHeader.title')} <strong>{category}</strong></h2>
                <Link to={`/sites/${category}`}>{t('relatedSites.subHeader.linkText')} <FaArrowRightLong /></Link>
            </div>

            <div className="related-sites">
                {relatedSites.map(relatedSite => (
                    <div key={relatedSite.id} className="related-site">
                        <Link to={`/site/${relatedSite.id}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
                            <img src={relatedSite.imageURL} alt={relatedSite.siteName} />
                            <div className="related-site-text">
                                <h1>{relatedSite.siteName}</h1>
                                <span>{t('relatedSites.madeBy')} {relatedSite.myName}</span>
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
