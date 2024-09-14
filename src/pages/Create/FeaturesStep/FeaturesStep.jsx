import React from 'react';
import { useTranslation } from 'react-i18next';
import "./FeaturesStep.scss";

const featuresList = [
    { id: 1, name: 'responsiveDesign' },
    { id: 2, name: 'responsiveNavigation' },
    { id: 3, name: 'responsiveSlider' },
    { id: 4, name: 'mediaLightbox' },
    { id: 5, name: 'backgroundVideo' },
    { id: 6, name: 'threeDTransformations' },
    { id: 7, name: 'interactions' },
    { id: 8, name: 'forms' },
    { id: 9, name: 'symbols' },
    { id: 10, name: 'cssGrid' },
    { id: 11, name: 'custom404Page' },
    { id: 12, name: 'webFonts' },
    { id: 13, name: 'retinaReady' },
    { id: 14, name: 'contentManagementSystem' },
    { id: 15, name: 'ecommerce' },
    { id: 16, name: 'cssAnimations' },
    { id: 17, name: 'crossBrowserCompatibility' },
    { id: 18, name: 'socialMediaIntegration' },
    { id: 19, name: 'seoOptimization' },
    { id: 20, name: 'multilingualSupport' },
];

const FeaturesStep = ({ features, setFeatures, setStep }) => {
    const { t } = useTranslation();

    const toggleFeature = (id) => {
        if (features.includes(id)) {
            setFeatures(features.filter(featureId => featureId !== id));
        } else {
            setFeatures([...features, id]);
        }
    };

    return (
        <section id="features-step">
            {featuresList.map(feature => (
                <div className='features' key={feature.id}>
                    <input
                        type='checkbox'
                        id={feature.id}
                        checked={features.includes(t(`features.${feature.name}`))}
                        onChange={() => toggleFeature(t(`features.${feature.name}`))}
                    />
                    <label htmlFor={feature.id}>{t(`features.${feature.name}`)}</label>
                </div>
            ))}

            <div className="step-buttons">
                <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">{t('features.back')}</button>
                <button onClick={() => setStep((prev) => prev + 1)} type='button'>{t('features.continue')}</button>
            </div>
        </section>
    );
};

export default FeaturesStep;
