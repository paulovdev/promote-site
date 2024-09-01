import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';
import { RiArrowRightUpLine } from "react-icons/ri";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import './SiteCard.scss';

const SiteCard = ({ site }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Link to={`/site/${site.id}`} key={site.id} className="site-card" onClick={() => scrollTo({ top: 0 })}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 50, damping: 5 }}
            >
                <img
                    src={site.imageURL}
                    alt={site.siteName}
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
                        <p>{site.category}</p>
                    </div>
                    <h1>{site.siteName}</h1>
                    <p>{site.description}</p>
                    <span>Feito por {site.myName}</span>

                    <div className="view"><RiArrowRightUpLine /></div>
                </div>
            </motion.div>
        </Link>
    );
};

export default SiteCard;
