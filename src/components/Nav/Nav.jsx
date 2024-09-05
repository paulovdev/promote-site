import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BiLastPage } from "react-icons/bi";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

import "./Nav.scss";
import ThemeChange from './../ThemeChange/ThemeChange';


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
                    <div className="logo">
                        <Link to="/">
                            <BiLastPage />
                        </Link>
                    </div>


                    <ul className='desktop-menu' onClick={() => scrollTo({ top: 0 })}>
                        <li>  <LanguageSelector /></li>
                        <li><NavLink className='explore-nav' to="/stories">{t('nav.stories')}</NavLink></li>
                        <li><NavLink className='explore-nav' to="/sites/all">{t('nav.explore')}</NavLink></li>
                        <li onClick={() => scrollTo({ top: 0 })}>
                            <NavLink className='feature-nav' to="/create">{t('nav.submitTemplate')}</NavLink>
                        </li>
                        <li>  <ThemeChange /></li>
                    </ul>

                    <div className="mobile-menu" onClick={toggleMenu}>
                        <div className={`hm-bar ${!hmRotate ? "" : "active"}`}></div>
                        <div className={`hm-bar ${!hmRotate ? "" : "active"}`}></div>
                    </div>

                    <AnimatePresence mode="wait">
                        {showMenu && (
                            <motion.ul className="mobile-menu-content"
                                onClick={toggleMenu}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li><NavLink to="/stories">{t('nav.histories')} <BsArrowRight /></NavLink></li>
                                <li><NavLink to="/sites/all">{t('nav.exploreAll')} <BsArrowRight /></NavLink></li>
                                <li><NavLink to="/create">{t('nav.startSelling')} <BsArrowRight /></NavLink></li>
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
