import React, { useEffect } from 'react';
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
    { id: 20, name: 'multilingualSupport'},
];

const FeaturesStep = ({ features, setFeatures, setStep }) => {
    const { t } = useTranslation();

    // Efeito para recuperar as features do sessionStorage ao montar o componente
    useEffect(() => {
        const storedFeatures = JSON.parse(sessionStorage.getItem('selectedFeatures')) || [];
        setFeatures(storedFeatures); // Atualiza o estado pai ao montar o componente
    }, [setFeatures]);

    // Efeito para sincronizar com sessionStorage
    useEffect(() => {
        // Apenas salva no sessionStorage se features não estiver vazio
        if (features.length) {
            sessionStorage.setItem('selectedFeatures', JSON.stringify(features));
        }
    }, [features]);

    const toggleFeature = (name) => {
        const updatedFeatures = features.includes(name)
            ? features.filter(featureName => featureName !== name)
            : [...features, name];

        setFeatures(updatedFeatures);
        sessionStorage.setItem('selectedFeatures', JSON.stringify(updatedFeatures)); // Salva no sessionStorage
    };

    return (
        <>
            <section id="features-step">
                {featuresList.map(feature => (
                    <div className='features' key={feature.id}>
                        <input
                            type='checkbox'
                            id={feature.name}
                            checked={features.includes(feature.name)} // Verificando o feature.name
                            onChange={() => toggleFeature(feature.name)} // Usando feature.name
                        />
                        <label htmlFor={feature.name}>{t(`features.${feature.name}`)}</label>
                    </div>
                ))}
            </section>
            <div className="step-buttons">
                <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">{t('features.back')}</button>
                <button onClick={() => setStep((prev) => prev + 1)} type='button'>{t('features.continue')}</button>
            </div>
        </>
    );
};

export default FeaturesStep;
