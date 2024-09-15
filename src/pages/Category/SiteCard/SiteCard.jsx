import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';
import { RiArrowRightUpLine } from "react-icons/ri";

import './SiteCard.scss';

const SiteCard = ({ site }) => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);
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
    const currentCategory = categories.find(cat => cat.path === `/sites/${site.category}`)?.name;


    return (
        <Link to={`/site/${site.id}`} key={site.id} className="site-card" onClick={() => scrollTo({ top: 0 })}>

            <img
                src={site.imageURL}
                alt={site.siteName}
                width={325} height={200}
                className="site-image"
                onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && <div className="placeholder" />}
            <div className="text-card">
                <div className="several-content">
                    <span>
                        {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                        {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                        {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                        {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                        {site.tool === 'html-css-js' && <>
                            <FaHtml5 style={{ background: '#e34c26' }} />
                            <DiCss3 style={{ background: '#264de4' }} />
                            <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                        </>}
                        {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                        {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                        {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                        {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                        {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                    </span>
                    <p>{currentCategory}</p>
                </div>
                <h1>{site.siteName}</h1>
                <span>{t('made.made-by')} {site.myName}</span>

                <div className="view"><RiArrowRightUpLine /></div>
            </div>

        </Link>
    );
};

export default SiteCard;
