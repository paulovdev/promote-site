import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaStarOfLife } from "react-icons/fa6";

import ThemeChange from './../ThemeChange/ThemeChange';
import "./Nav.scss";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const Navbar = () => {
    // Correctly initialize state using useState
    const [showMenu, setShowMenu] = useState(false);
    const [hmRotate, setHmRotate] = useState(false)
    // Toggle mobile menu visibility
    function toggleMenu() {
        setShowMenu(prevState => !prevState);
        setHmRotate(prevState => !prevState)
    }

    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <Link to="/">
                            <FaStarOfLife /> Quimplo
                        </Link>
                    </div>

                    <ul className='desktop-menu' onClick={() => scrollTo({ top: 0 })}>
                        <li><ThemeChange onClick={() => scrollTo({ top: 0 })} /></li>
                        <li><NavLink className='explore-nav' to="/stories">Stories </NavLink></li>
                        <li><NavLink className='explore-nav' to="/sites/all">Explore</NavLink></li>
                        <motion.li
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 150, damping: 8 }}
                            onClick={() => scrollTo({ top: 0 })}>
                            <NavLink className='feature-nav' to="/create">Start sell</NavLink>
                        </motion.li>


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
                                <li><NavLink to="/stories">Stories <BsArrowRight /></NavLink></li>
                                <li><NavLink to="/sites/all">Explore <BsArrowRight /></NavLink></li>
                                <li><NavLink to="/create">Start sell <BsArrowRight /></NavLink></li>
                                <li><ThemeChange /></li>
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
