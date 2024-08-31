import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBorderAll, FaBlog, FaBusinessTime, FaPalette, FaGraduationCap, FaShoppingCart, FaHeartbeat, FaRegCopyright, FaPlane } from "react-icons/fa";
import { MdEvent, MdOutlineWeb, MdPhotoCamera } from "react-icons/md";
import { AiOutlineFundProjectionScreen, AiOutlineBarChart } from "react-icons/ai";
import { GiMeal } from "react-icons/gi";
import { Swiper, SwiperSlide } from 'swiper/react';

import './CategoryFilters.scss';

const CategoryFilters = ({ activeMenu, handleMenuToggle }) => {
    const categories = [
        { name: 'Todos', icon: <FaBorderAll />, path: "/sites/all" },
        { name: 'Popular', icon: <AiOutlineBarChart />, path: "/sites/hot" },
        { name: 'Blog', icon: <FaBlog />, path: "/sites/blog" },
        { name: 'Negócios', icon: <FaBusinessTime />, path: "/sites/business" },
        { name: 'Criativo', icon: <FaPalette />, path: "/sites/creative" },
        { name: 'Educacional', icon: <FaGraduationCap />, path: "/sites/educational" },
        { name: 'E-commerce', icon: <FaShoppingCart />, path: "/sites/e-commerce" },
        { name: 'Evento', icon: <MdEvent />, path: "/sites/event" },
        { name: 'Saúde e Bem-Estar', icon: <FaHeartbeat />, path: "/sites/health-wellness" },
        { name: 'Landing Page', icon: <MdOutlineWeb />, path: "/sites/landing-page" },
        { name: 'Sem Fins Lucrativos', icon: <FaRegCopyright />, path: "/sites/non-profit" },
        { name: 'Fotografia', icon: <MdPhotoCamera />, path: "/sites/photography" },
        { name: 'Portfólio', icon: <AiOutlineFundProjectionScreen />, path: "/sites/portfolio" },
        { name: 'Restaurante', icon: <GiMeal />, path: "/sites/restaurant" },
        { name: 'Saas', icon: <AiOutlineBarChart />, path: "/sites/saas" },
        { name: 'Tecnologia', icon: <AiOutlineBarChart />, path: "/sites/technology" },
        { name: 'Viagem', icon: <FaPlane />, path: "/sites/travel" }
    ];

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 809);

    const handleResize = () => {
        setIsDesktop(window.innerWidth > 809);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id='nav-category'>
            <nav>
                {(isDesktop || activeMenu === 'category') && (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={'auto'}

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