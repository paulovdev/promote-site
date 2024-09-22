import React from 'react';
import { useTranslation } from 'react-i18next';
import "./CookiesPage.scss";

const CookiesPage = () => {
    const { t } = useTranslation();

    return (
        <section id='cookies-section'>
            <h1>{t('cookies.cookiesPolicyTitle')}</h1>
            <p>{t('cookies.introText')}</p>
            <br />
            <h2>{t('cookies.whatAreCookiesTitle')}</h2>
            <p>{t('cookies.whatAreCookiesText')}</p>
            <br />
            <h2>{t('cookies.howWeUseCookiesTitle')}</h2>
            <p>{t('cookies.howWeUseCookiesText')}</p>
            <ul>
                <li><strong>{t('cookies.necessaryCookies').split(': ')[0]}:</strong> {t('cookies.necessaryCookies').split(': ')[1]}</li>
                <li><strong>{t('cookies.performanceCookies').split(': ')[0]}:</strong> {t('cookies.performanceCookies').split(': ')[1]}</li>
                <li><strong>{t('cookies.functionalityCookies').split(': ')[0]}:</strong> {t('cookies.functionalityCookies').split(': ')[1]}</li>
            </ul>
            <br />
            <h2>{t('cookies.managingCookiesTitle')}</h2>
            <p>{t('cookies.managingCookiesText')}</p>
            <br />
            <h2>{t('cookies.moreInfoTitle')}</h2>
            <p>{t('cookies.moreInfoText')}</p>
        </section>
    );
}

export default CookiesPage;
