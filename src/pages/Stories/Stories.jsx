import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useSites } from '../../context/SitesHomeContext';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { IoCloseOutline } from "react-icons/io5";

import Transition from "../../utils/Transition/Transition"
import './Stories.scss';

const Stories = () => {
    const { sites, loading } = useSites();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="stories-container">
            <div className="back-button">
                <Link to="/"><IoCloseOutline /></Link>
            </div>
            <Swiper
                autoplay={{ delay: 8000, disableOnInteraction: false }}
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
                            <img src={site.imageURL} alt={site.siteName} />
                            <div className="text-content">
                                <div className="text-card">
                                    <div className="several-content">

                                        <span>
                                            {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                                            {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                                            {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                                            {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                                            {site.tool === 'html-css-js' && <FaHtml5 style={{ background: '#e34c26' }} />}
                                            {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                                            {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                                            {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                                            {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                                            {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                                        </span>
                                        <p>{site.category}</p>
                                    </div>  </div>
                                <h1>{site.siteName}</h1>
                                <p>{site.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Transition(Stories, { text: "Website stories" });
