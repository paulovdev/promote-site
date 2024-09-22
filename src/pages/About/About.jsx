import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { RiArrowRightDownLine } from "react-icons/ri";

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
                <div className="head-container">
                    <span>{t('about.aboutTitle')}</span>
                    <h1>{t('about.quimploForAll')}</h1>
                    <p>{t('about.introText')}</p>
                </div>

                <div className="mid-container">
                    <span>{t('about.whatIsQuimploTitle')}</span>
                    <p>{t('about.whatIsQuimploText')}</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <h2>{t('about.forProgrammersTitle')}</h2>
                        <p>{t('about.forProgrammersText')}</p>
                        <RiArrowRightDownLine />
                    </div>

                    <div className="card">
                        <h2>{t('about.forNonProgrammersTitle')}</h2>
                        <p>{t('about.forNonProgrammersText')}</p>
                        <RiArrowRightDownLine />
                    </div>
                </div>


            </section>
        </>
    );
}

export default About;
