import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';

import "./RelatedSites.scss";

const RelatedSites = ({ relatedSites, category }) => {
    const { t } = useTranslation();
    const categories = [
        { name: t('categories.all'), path: "/sites/all" },
        { name: t('categories.featured'), path: "/sites/hot" },
        { name: t('categories.blog'), path: "/sites/blog" },
        { name: t('categories.business'), path: "/sites/business" },
        { name: t('categories.creative'), path: "/sites/creative" },
        { name: t('categories.educational'), path: "/sites/educational" },
        { name: t('categories.ecommerce'), path: "/sites/e-commerce" },
        { name: t('categories.event'), path: "/sites/event" },
        { name: t('categories.health'), path: "/sites/health-wellness" },
        { name: t('categories.landingPage'), path: "/sites/landing-page" },
        { name: t('categories.nonProfit'), path: "/sites/non-profit" },
        { name: t('categories.photography'), path: "/sites/photography" },
        { name: t('categories.portfolio'), path: "/sites/portfolio" },
        { name: t('categories.restaurant'), path: "/sites/restaurant" },
        { name: t('categories.saas'), path: "/sites/saas" },
        { name: t('categories.technology'), path: "/sites/technology" },
        { name: t('categories.travel'), path: "/sites/travel" }
    ];

    return (
        <section id='site-more-category'>
            <div className="sub-header-text" onClick={() => scrollTo({ top: 0 })}>
                <h2>{t('relatedSites.subHeader.title')} <strong>{category}</strong></h2>
                <Link to={`/sites/${category}`}>{t('relatedSites.subHeader.linkText')} <FaArrowRightLong /></Link>
            </div>

            <div className="related-sites">
                {relatedSites.map(relatedSite => {
                    const currentCategory = categories.find(cat => cat.path === `/sites/${relatedSite.category}`)?.name;

                    return (
                        <div key={relatedSite.id} className="related-site">
                            <Link to={`/site/${relatedSite.id}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
                                <img src={relatedSite.imageURL1} alt={relatedSite.siteName} />
                                <div className="text-card">
                                    <span>
                                        {relatedSite.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                                        {relatedSite.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                                        {relatedSite.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                                        {relatedSite.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                                        {relatedSite.tool === 'html-css-js' && (
                                            <>
                                                <FaHtml5 style={{ background: '#e34c26' }} />
                                                <DiCss3 style={{ background: '#264de4' }} />
                                                <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                                            </>
                                        )}
                                        {relatedSite.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                                        {relatedSite.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                                        {relatedSite.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                                        {relatedSite.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                                        {relatedSite.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                                    </span>

                                    <div className="title-text">
                                        <h1>{relatedSite.siteName}</h1>
                                        <p>•</p>
                                        <p>{currentCategory}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RelatedSites;
