
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { PiTargetBold } from "react-icons/pi";

import ThemeChange from './../ThemeChange/ThemeChange';
import "./Nav.scss";
/* import { IoIosSearch } from "react-icons/io";
 */
const Navbar = () => {


    return (
        <>
            <header>
                <nav>

                    <div className="logo">
                        <Link to="/">
                            <PiTargetBold />  Quimplo
                        </Link>
                    </div>

                    <ul className='desktop-menu' onClick={() => scrollTo({ top: 0 })}>
                        <li><ThemeChange onClick={() => scrollTo({ top: 0 })} /></li>
                        <li><NavLink className='explore-nav' to="/stories">News</NavLink></li>
                        <li><NavLink className='explore-nav' to="/sites/all">Explore</NavLink></li>
                        <motion.li
                            whileHover={{ scale: 1.03, }}
                            transition={{ type: "spring", stiffness: 150, damping: 8 }}
                            onClick={() => scrollTo({ top: 0 })}><NavLink className='feature-nav' to="/create">Submit your site</NavLink></motion.li>
                    </ul>

                </nav>


            </header>
        </>
    );
};

export default Navbar;
