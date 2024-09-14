import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';

import './CategoryFilters.scss';

const CategoryFilters = ({ activeMenu, handleMenuToggle }) => {
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

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 809);
    const swiperRef = useRef(null);
    const location = useLocation();

    const handleResize = () => {
        setIsDesktop(window.innerWidth > 809);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const activeCategoryIndex = categories.findIndex(category => category.path === location.pathname);
        if (swiperRef.current && activeCategoryIndex !== -1) {
            swiperRef.current.slideTo(activeCategoryIndex);
        }
    }, [location, categories]);

    return (
        <div id='nav-category'>
            <nav>
                {(isDesktop || activeMenu === 'category') && (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={'auto'}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        touchStartPreventDefault={false}
                        
                        preventClicks={false}
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index}>
                                <NavLink to={category.path}>
                                    {category.name}
                                </NavLink>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </nav>
        </div>
    );
};

export default CategoryFilters;







{/* 
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";
    const CategoryFilters = ({
    activeMenu,
    handleMenuToggle,
    toolFilters,
    handleToolFilterChange,
    setSearchQuery,
}) => {
                <h2 onClick={() => handleMenuToggle('tools')}>
                    Ferramentas <IoIosArrowDown style={{ transform: activeMenu === 'tools' ? "rotate(180deg)" : "rotate(0)" }} />
                </h2>
                <AnimatePresence mode='wait'>
                    {(isDesktop || activeMenu === 'tools') && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeMenu === 'tools' || isDesktop ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                            id='filters'>
                            {toolFilters.map(tool => (
                                <React.Fragment key={tool.id}>
                                    <input
                                        type='checkbox'
                                        id={tool.id}
                                        checked={tool.checked}
                                        onChange={() => handleToolFilterChange(tool.id)}
                                    />
                                    <label htmlFor={tool.id}>{tool.label}</label>
                                </React.Fragment>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence> */}