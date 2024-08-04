import { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import "./Nav.scss";
import { slide as Menu } from 'react-burger-menu';
import { FaArrowRightLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import ThemeChange from './../ThemeChange/ThemeChange';
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeAllMenusOnEsc = (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            setMenuOpen(false);
        }
    };

    const toggleMenuOnShortcut = (e) => {
        if (e.shiftKey && e.key === 'M') {
            setMenuOpen(prevState => !prevState);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', closeAllMenusOnEsc);
        window.addEventListener('keydown', toggleMenuOnShortcut);

        return () => {
            window.removeEventListener('keydown', closeAllMenusOnEsc);
            window.removeEventListener('keydown', toggleMenuOnShortcut);
        };
    }, []);

    return (
        <>
            <header>

                <nav>
                    <div className="logo">
                        <Link to="/">
                            Quimplo
                        </Link>
                    </div>
                    <ul className='desktop-menu' onClick={() => scrollTo({ top: 0 })}>
                        <li><ThemeChange onClick={() => scrollTo({ top: 0 })} /></li>
                        <li><NavLink className='explore-nav' to="/sites/all">Explore</NavLink></li>
                        <li><NavLink className='feature-nav' to="/create">Submit your site</NavLink></li>
                    </ul>


                </nav>


                <Menu
                    right
                    width={400}
                    isOpen={menuOpen}
                    onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                >
                    <div className="menu-text">
                        <span>NAVIGATE</span>
                        <div className="border-bottom"></div>
                    </div>

                    <div className="search-input">
                        <div className="search-input">
                            <button className="bt1">
                                <IoIosSearch size={22} />
                            </button>
                            <input
                                type="text"
                                placeholder="Search"

                            />
                        </div>
                    </div>

                    <div className="nav-text" onClick={menuOpen}>
                        <Link to="/">Home <FaArrowRightLong /> </Link>
                    </div>

                    <div className="nav-text" onClick={menuOpen}>
                        <Link to="/sites/blog" >Explore <FaArrowRightLong /> </Link>
                    </div>

                    <div className="nav-text" onClick={menuOpen}>
                        <Link to="/create">How it's work? <FaArrowRightLong /> </Link>
                    </div>

                    <div className="nav-button" onClick={menuOpen}>
                        <Link to="/create">
                            Submit your site <MdKeyboardArrowRight size={22} />
                        </Link >
                    </div>

                    <div className="menu-text-end">
                        <span>© 2024 SitePromote.</span>
                        <div className="border-bottom"></div>
                    </div>
                </Menu>

            </header>
        </>
    );
};

export default Navbar;
