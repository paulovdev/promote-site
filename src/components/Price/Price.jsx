import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './Price.scss';

const Price = ({ onClick }) => {
    const { t } = useTranslation();


    return (
        <section id="price">
            <div className="plans">
                <div className="plan" onClick={onClick}>
                    <h3>Quimplo</h3>
                    <span className="cost">{t('price.free')}</span>
                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                    </ul>
                    <button>{t('price.publishSite')}</button>
                </div>

                <div className="plan" onClick={onClick}>
                    <h3>Quimplo featured</h3>
                    <span className="cost">{t('price.price')}</span>
                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                    </ul>
                    <button>{t('price.develop')}</button>
                </div>
            </div>
        </section>
    );
};


export default Price;
