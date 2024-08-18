import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

import './CategoryFilters.scss';
import { AnimatePresence, motion } from 'framer-motion';

const CategoryFilters = ({
    activeMenu,
    handleMenuToggle,
    toolFilters,
    handleToolFilterChange,
    setSearchQuery,
}) => {
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
            <div className="search">
                <IoMdSearch />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
            </div>
            <nav>
                <h2 onClick={() => handleMenuToggle('category')}>
                    Categories <IoIosArrowDown style={{ transform: activeMenu === 'category' ? "rotate(180deg)" : "rotate(0)" }} />
                </h2>

                <AnimatePresence mode='wait'>
                    {(isDesktop || activeMenu === 'category') && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeMenu === 'category' || isDesktop ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                        >
                            <ul onClick={() => handleMenuToggle('category')}>
                                <li><NavLink to="/sites/all">All</NavLink></li>
                                <li><NavLink to="/sites/hot">Hot</NavLink></li>
                                <li><NavLink to="/sites/blog">Blog</NavLink></li>
                                <li><NavLink to="/sites/business">Business</NavLink></li>
                                <li><NavLink to="/sites/creative">Creative</NavLink></li>
                                <li><NavLink to="/sites/educational">Educational</NavLink></li>
                                <li><NavLink to="/sites/e-commerce">E-commerce</NavLink></li>
                                <li><NavLink to="/sites/event">Event</NavLink></li>
                                <li><NavLink to="/sites/health-wellness">Health & Wellness</NavLink></li>
                                <li><NavLink to="/sites/landing-page">Landing Page</NavLink></li>
                                <li><NavLink to="/sites/non-profit">Non-Profit</NavLink></li>
                                <li><NavLink to="/sites/photography">Photography</NavLink></li>
                                <li><NavLink to="/sites/portfolio">Portfolio</NavLink></li>
                                <li><NavLink to="/sites/restaurant">Restaurant</NavLink></li>
                                <li><NavLink to="/sites/saas">Saas</NavLink></li>
                                <li><NavLink to="/sites/technology">Technology</NavLink></li>
                                <li><NavLink to="/sites/travel">Travel</NavLink></li>
                            </ul>
                        </motion.div>
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
                        >
                            <div id='filters'>
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
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </nav>
        </div>
    );
};

export default CategoryFilters;
