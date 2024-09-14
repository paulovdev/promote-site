import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './Price.scss';

const Price = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <section id="price">
            <div className="plans">
                <div className="plan" onClick={onClick}>

                    <h3 className="plan-title">
                        {t('price.basicPlanTitle')} <p className="cost">{t('price.free')}</p>
                    </h3>


                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />{t('price.limitedReviewTime')}</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />{t('price.homepageFeature')}</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />{t('price.featuredSection')}</li>


                    </ul>
                    <button onClick={onClick}>{t('price.publishSite')}</button>
                </div>

                <div className="plan">

                    <h3 className="plan-title">
                        {t('price.fastPlanTitle')} <p className="cost">{t('price.price')}</p>
                    </h3>

                    <ul className="features" >
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.reducedReviewTime')}</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.homepageFeature')}</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.featuredSection')}</li>
                    </ul>
                    <button onClick={onClick} disabled>{t('price.develop')}</button>

                </div>
            </div>
        </section>
    );
};

export default Price;
