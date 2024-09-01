import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { BiLastPage } from "react-icons/bi";

import "./Nav.scss";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const Navbar = () => {
    // Inicializa corretamente o estado usando useState
    const [showMenu, setShowMenu] = useState(false);
    const [hmRotate, setHmRotate] = useState(false);

    // Alterna a visibilidade do menu móvel
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
                            <BiLastPage />Quimplo
                        </Link>
                    </div>

                    <ul className='desktop-menu' onClick={() => scrollTo({ top: 0 })}>
                        <li><NavLink className='explore-nav' to="/stories">Histórias </NavLink></li>
                        <li><NavLink className='explore-nav' to="/sites/all">Explorar</NavLink></li>
                        <motion.li
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 150, damping: 8 }}
                            onClick={() => scrollTo({ top: 0 })}
                        >
                            <NavLink className='feature-nav' to="/create">Publicar template</NavLink>
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
                                <li><NavLink to="/stories">Histórias <BsArrowRight /></NavLink></li>
                                <li><NavLink to="/sites/all">Explorar <BsArrowRight /></NavLink></li>
                                <li><NavLink to="/create">Comece a vender <BsArrowRight /></NavLink></li>
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
