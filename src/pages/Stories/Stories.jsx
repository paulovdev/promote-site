import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Helmet } from 'react-helmet';
import { useSites } from '../../hooks/useSites';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { IoCloseOutline } from "react-icons/io5";
import { DiCss3, DiJavascript1 } from 'react-icons/di';

import Transition from "../../utils/Transition/Transition";
import './Stories.scss';

const Stories = () => {
    const { i18n, t } = useTranslation();
    const { sites, loading } = useSites();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t('helmet.stories')}</title>

            </Helmet>

            <div id="stories">
                <div className="back-button">
                    <Link to="/"><IoCloseOutline /></Link>
                </div>
                <Swiper
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-stories-button-prev',
                        nextEl: '.swiper-stories-button-next',
                    }}
                    pagination={{ clickable: true }}
                    className="swiper-container"
                >
                    {sites.map((site) => (
                        <SwiperSlide key={site.id}>
                            <div className="story-background" style={{ backgroundColor: site.color || '#ccc' }}>
                                <img src={site.imageURL1} alt={site.siteName} />
                                <div className="text-content">
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
                                    </div>
                                    <h1>{site.siteName}</h1>
                                    <p>{i18n.language === 'en' ? site.descriptionEn : site.descriptionBr}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Transition(Stories, { text: { br: "Histórias", en: "Stories" } });
