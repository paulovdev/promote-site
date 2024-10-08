import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import AboutLogos from './AboutLogos/AboutLogos';

import "./About.scss";

const About = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t('helmet.about')}</title>
            </Helmet>
            <section id='about-section'>
                <motion.div
                    className="head-container"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span>{t('about.aboutTitle')}</span>
                    <h1>{t('about.quimploForAll')}</h1>
                    <p>{t('about.introText')}</p>
                </motion.div>

                <motion.div
                    className="mid-container"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span>{t('about.whatIsQuimploTitle')}</span>
                    <p>{t('about.whatIsQuimploText')}</p>
                </motion.div>

                <AboutLogos />
            </section>
        </>
    );
}

export default About;
