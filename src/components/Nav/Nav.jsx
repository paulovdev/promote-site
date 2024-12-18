import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useTranslation } from "react-i18next";

import { BiLastPage } from "react-icons/bi";

import ThemeChange from "../ThemeChange/ThemeChange";


import "./Nav.scss";


const Navbar = () => {
    const { t } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);
    const [hmRotate, setHmRotate] = useState(false);

    function toggleMenu() {
        setShowMenu(prevState => !prevState);
        setHmRotate(prevState => !prevState);
    }

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="logo" onClick={() => {
                        scrollTo({ top: 0 });
                        if (showMenu) {
                            toggleMenu()
                            return
                        }
                    }}>
                        <BiLastPage />
                    </Link>

                    <div className="desktop-menu">
                        <li onClick={() => scrollTo({ top: 0 })}><NavLink className='explore-nav' to="/sites/all">{t('nav.explore')}</NavLink></li>
                        <li onClick={() => scrollTo({ top: 0 })}><NavLink className='explore-nav' to="/about">{t('nav.about')}</NavLink></li>
                      
                        <li onClick={() => scrollTo({ top: 0 })}>
                            <NavLink className='feature-nav' to="/create">{t('nav.submitTemplate')}</NavLink>
                        </li>
                        <li><ThemeChange /></li>
                    </div>


                    <div className="mobile-menu-wrapper"> <ThemeChange />
                        <div className="mobile-menu" onClick={toggleMenu}>
                            <div className={`hm-bar ${!hmRotate ? "" : "active"}`}></div>
                            <div className={`hm-bar ${!hmRotate ? "" : "active"}`}></div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {showMenu && (
                            <motion.ul className="mobile-menu-content"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li onClick={() => {
                                    scrollTo({ top: 0 });
                                    toggleMenu()
                                }}><NavLink to="/" >{t('nav.home')}</NavLink>
                                </li>

                                <li onClick={() => {
                                    scrollTo({ top: 0 });
                                    toggleMenu()
                                }}><NavLink to="/sites/all">{t('nav.exploreAll')}</NavLink>
                                </li>

                                <li onClick={() => {
                                    scrollTo({ top: 0 });
                                    toggleMenu()
                                }}><NavLink to="/about">{t('nav.about')}</NavLink>
                                </li>

                                <li onClick={() => {
                                    scrollTo({ top: 0 });
                                    toggleMenu()
                                }}>
                                    <NavLink className='feature-nav' to="/create">{t('nav.submitTemplate')}</NavLink>
                                </li>


                            </motion.ul>
                        )}
                    </AnimatePresence>
                </nav>
            </header >
        </>
    );
};

export default Navbar;