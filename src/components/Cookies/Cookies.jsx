import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import './Cookies.scss';
import { Link } from 'react-router-dom';

const CookiesComponent = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = Cookies.get('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set('cookieConsent', 'true', {
            expires: 365,
            secure: true,
            sameSite: 'Strict'
        });
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
                    transition={{ duration: 0.3, delay: 1.7 }}
                >
                    <p>{t('cookies.cookieNoticeMessage')} <Link to="/cookies">{t('cookies.cookiePolicy')}</Link></p>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 1000, damping: 5 }}
                        onClick={handleAccept}
                    >
                        {t('cookies.acceptButton')}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookiesComponent;
