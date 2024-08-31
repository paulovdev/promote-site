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
                    transition={{ duration: 0.3, delay: 1.8 }}
                >
                    <h1>Este site usa cookies</h1>
                    <p>Utilizamos cookies para garantir que você tenha a melhor experiência em nosso site. <a href="#">Política de Cookies.</a></p>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 1000, damping: 5 }}
                        onClick={handleAccept}>Aceitar</motion.button>
                </motion.div>

            )}
        </AnimatePresence>
    );
};

export default CookiesComponent;
