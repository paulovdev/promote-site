import React from 'react';
import { useTranslation } from 'react-i18next';
import "./CookiesPage.scss";
import { motion } from 'framer-motion';

const CookiesPage = () => {
    const { t } = useTranslation();

    return (
        <motion.section id='cookies-section'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
        >
            <h1>{t('cookies.cookiesPolicyTitle')}</h1>
            <p>{t('cookies.introText')}</p>
            <br />
            <h2>{t('cookies.whatAreCookiesTitle')}</h2>
            <p>{t('cookies.whatAreCookiesText')}</p>
            <br />
            <h2>{t('cookies.howWeUseCookiesTitle')}</h2>
            <p>{t('cookies.howWeUseCookiesText')}</p>
            <ul>
                <li><strong>{t('cookies.necessaryCookies').split(': ')[0]}:</strong> <p>{t('cookies.necessaryCookies').split(': ')[1]}</p></li>
                <li><strong>{t('cookies.performanceCookies').split(': ')[0]}:</strong><p> {t('cookies.performanceCookies').split(': ')[1]}</p></li>
                <li><strong>{t('cookies.functionalityCookies').split(': ')[0]}:</strong><p> {t('cookies.functionalityCookies').split(': ')[1]}</p></li>
            </ul>
            <br />
            <h2>{t('cookies.managingCookiesTitle')}</h2>
            <p>{t('cookies.managingCookiesText')}</p>
            <br />
            <h2>{t('cookies.moreInfoTitle')}</h2>
            <p>{t('cookies.moreInfoText')}</p>


        </motion.section>
    );
}

export default CookiesPage;
