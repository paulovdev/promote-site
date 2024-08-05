import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import './Cookies.scss';

const CookiesComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = Cookies.get('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set('cookieConsent', 'true', { expires: 365 });
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="cookie-popup"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>We use cookies to ensure you get the best experience on our website. <a href="#">Cookies policy.</a></p>
                    <button onClick={handleAccept}>Got it!</button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookiesComponent;
