import React from 'react';
import { useTranslation } from 'react-i18next';
import './HomeNewsLetter.scss';

const HomeNewsLetter = () => {
    const { t } = useTranslation();

    return (
        <section id="home-newsletter">
            <h1>{t('homeNewsletter.titlePart1')}</h1>
            <form>
                <input type="email" placeholder='example@gmail.com' autoComplete='email' />
                <button>{t('homeNewsletter.buttonText')}</button>
            </form>
        </section>
    );
};

export default HomeNewsLetter;
