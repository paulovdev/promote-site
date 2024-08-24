import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { FaBorderAll, FaBlog, FaBusinessTime, FaPalette, FaGraduationCap, FaShoppingCart, FaHeartbeat, FaRegCopyright, FaPlane } from "react-icons/fa";
import { MdEvent, MdOutlineWeb, MdPhotoCamera } from "react-icons/md";
import { AiOutlineFundProjectionScreen, AiOutlineBarChart } from "react-icons/ai";
import { GiMeal } from "react-icons/gi";

import './CategoryFilters.scss';
import { AnimatePresence, motion } from 'framer-motion';

const CategoryFilters = ({
    activeMenu,
    handleMenuToggle,
    toolFilters,
    handleToolFilterChange,
    setSearchQuery,

}) => {
    const categories = [
        { name: 'All', icon: <FaBorderAll />, path: "/sites/all" },
        { name: 'Hot', icon: <AiOutlineBarChart />, path: "/sites/hot" },
        { name: 'Blog', icon: <FaBlog />, path: "/sites/blog" },
        { name: 'Business', icon: <FaBusinessTime />, path: "/sites/business" },
        { name: 'Creative', icon: <FaPalette />, path: "/sites/creative" },
        { name: 'Educational', icon: <FaGraduationCap />, path: "/sites/educational" },
        { name: 'E-commerce', icon: <FaShoppingCart />, path: "/sites/e-commerce" },
        { name: 'Event', icon: <MdEvent />, path: "/sites/event" },
        { name: 'Health & Wellness', icon: <FaHeartbeat />, path: "/sites/health-wellness" },
        { name: 'Landing Page', icon: <MdOutlineWeb />, path: "/sites/landing-page" },
        { name: 'Non-Profit', icon: <FaRegCopyright />, path: "/sites/non-profit" },
        { name: 'Photography', icon: <MdPhotoCamera />, path: "/sites/photography" },
        { name: 'Portfolio', icon: <AiOutlineFundProjectionScreen />, path: "/sites/portfolio" },
        { name: 'Restaurant', icon: <GiMeal />, path: "/sites/restaurant" },
        { name: 'Saas', icon: <AiOutlineBarChart />, path: "/sites/saas" },
        { name: 'Technology', icon: <AiOutlineBarChart />, path: "/sites/technology" },
        { name: 'Travel', icon: <FaPlane />, path: "/sites/travel" }
    ];
    const [searchInput, setSearchInput] = useState('');
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 809); // Define desktop breakpoint

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchInput(query);
        setSearchQuery(query);
    };

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
                <h2 onClick={() => handleMenuToggle('category')}>
                    Categories <IoIosArrowDown style={{ transform: activeMenu === 'category' ? "rotate(180deg)" : "rotate(0)" }} />
                </h2>

                <AnimatePresence mode='wait'>
                    {(isDesktop || activeMenu === 'category') && (

                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeMenu === 'category' || isDesktop ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                            onClick={() => handleMenuToggle('category')}>
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <NavLink to={category.path}>
                                        {category.icon} {category.name}
                                    </NavLink>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                <h2 onClick={() => handleMenuToggle('tools')}>
                    Tools <IoIosArrowDown style={{ transform: activeMenu === 'tools' ? "rotate(180deg)" : "rotate(0)" }} />
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
                </AnimatePresence>

            </nav>
        </div>
    );
};

export default CategoryFilters;
