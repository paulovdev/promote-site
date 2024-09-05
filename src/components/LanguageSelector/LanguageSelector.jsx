import { useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

import "./LanguageSelector.scss";

function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const openDropdown = () => {
        setIsOpen(true);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleChange = (language) => {
        i18n.changeLanguage(language);
        Cookies.set('language', language, { expires: 365 });
        closeDropdown();
    };

    return (
        <div
            id="language-selector"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
        >
            <button className="dropdown-button">
                {i18n.language.toUpperCase()}
                <FaChevronDown className={`arrow-icon ${isOpen ? 'open' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <li onClick={() => handleChange('en')}>EN</li>
                        <li onClick={() => handleChange('br')}>BR</li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LanguageSelector;
