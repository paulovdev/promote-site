import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './Price.scss';

const Price = ({ setPlan, onClick, onPlanSelect }) => {
    const { t } = useTranslation();

    const handlePlanSelect = (planType) => {
        setPlan(planType);
        onPlanSelect(planType); // Chama a função com o tipo de plano
        onClick(); // Abre o modal ao selecionar um plano
    };

    return (
        <section id="price">
            <div className="plans">
                <div className="plan" onClick={() => handlePlanSelect('free')}>
                    <h3>Quimplo</h3>
                    <span className="cost">{t('price.free')}</span>
                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                    </ul>
                    <button>{t('price.publishSite')}</button>
                </div>

                <div className="plan" onClick={() => handlePlanSelect('paid')}>
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
