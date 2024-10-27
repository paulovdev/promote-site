import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import { IoFilterSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCategorySites } from '../../../hooks/useCategorySites';
import 'swiper/css';

import './CategoryFilters.scss';

const CategoryFilters = ({ activeMenu, setFilters }) => {
    const { t } = useTranslation();
    const { setCategory, filters } = useCategorySites();
    const [selectedTools, setSelectedTools] = useState({});
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 809);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 809);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleToolChange = (toolId) => {
        setSelectedTools((prevSelectedTools) => {
            const isChecked = !!prevSelectedTools[toolId];
            const newSelectedTools = {
                ...prevSelectedTools,
                [toolId]: !isChecked
            };

            // Atualiza o estado global com os IDs selecionados
            const selectedToolIds = Object.keys(newSelectedTools).filter(id => newSelectedTools[id]);
            setFilters((prevFilters) => ({
                ...prevFilters,
                tools: selectedToolIds
            }));

            return newSelectedTools;
        });
    };


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

    const tools = [
        { id: 'react', label: 'React' },
        { id: 'wordpress', label: 'WordPress' },
        { id: 'elementor', label: 'Elementor' },
        { id: 'framer', label: 'Framer' },
        { id: 'ghost', label: 'Ghost' },
        { id: 'html-css-js', label: 'HTML + CSS + JS' },
        { id: 'next', label: 'Next' },
        { id: 'webflow', label: 'Webflow' },
        { id: 'wix', label: 'Wix' }
    ];


    const handleFilterIconClick = () => setIsFilterModalOpen(!isFilterModalOpen);

    return (
        <div id='nav-category'>
            <nav>
                <div className='filter-icon' onClick={handleFilterIconClick}>
                    <IoFilterSharp />
                </div>
                <div className='wrapper-line'></div>
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
                                <NavLink to={category.path} onClick={() => setCategory(category.path.split('/').pop())}>
                                    {category.name}
                                </NavLink>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </nav>

            <AnimatePresence>
                {isFilterModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="filter-modal"
                    >
                        <div className="filter-modal-content">
                            <p>{t('category.modal.title')}</p>

                            <div className="filter-tools">

                                {tools.map(tool => (
                                    <React.Fragment key={tool.id}>
                                        <input
                                            type="checkbox"
                                            id={tool.id}
                                            checked={!!selectedTools[tool.id]} // Define o estado checked
                                            onChange={() => handleToolChange(tool.id)}
                                        />
                                        <label htmlFor={tool.id}>{tool.label}</label>
                                    </React.Fragment>
                                ))}

                            </div>


                            <div className='buttons-filter-modal'>
                                <button
                                    type='button'
                                    onClick={() => setIsFilterModalOpen(false)}
                                >
                                    {t('category.modal.ok')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryFilters;
