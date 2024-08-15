import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import './CategoryFilters.scss';

const CategoryFilters = ({
    categoriesAnim,
    isCategoryOpen,
    isToolsOpen,
    arrowAnim,
    arrowAnim2,
    toolAnim,
    toolFilters,
    handleToolFilterChange
}) => (
    <div id='nav-category'>
        <nav>
            <h2 onClick={categoriesAnim}>Categories <IoIosArrowDown style={{ transform: arrowAnim ? "rotate(180deg)" : "rotate(0)" }} /></h2>
            {!isCategoryOpen && (
                <ul onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
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
            )}
            <h2 onClick={toolAnim}>Tools<IoIosArrowDown style={{ transform: arrowAnim2 ? "rotate(180deg)" : "rotate(0)" }} /></h2>
            {!isToolsOpen && (
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
            )}
        </nav>
    </div>
);

export default CategoryFilters;
