import React from 'react';
import "./FeaturesStep.scss";

const featuresList = [
    { id: 1, name: 'Design Responsivo' },
    { id: 2, name: 'Navegação Responsiva' },
    { id: 3, name: 'Slider Responsivo' },
    { id: 4, name: 'Lightbox para Mídia' },
    { id: 5, name: 'Vídeo de Fundo' },
    { id: 6, name: 'Transformações 3D' },
    { id: 7, name: 'Interações' },
    { id: 8, name: 'Formulários' },
    { id: 9, name: 'Símbolos' },
    { id: 10, name: 'CSS Grid' },
    { id: 11, name: 'Página 404 Personalizada' },
    { id: 12, name: 'Fontes Web' },
    { id: 13, name: 'Pronto para Retina' },
    { id: 14, name: 'Sistema de Gerenciamento de Conteúdo' },
    { id: 15, name: 'E-commerce' },
    { id: 16, name: 'Animações CSS' },
    { id: 17, name: 'Compatibilidade Multinavegador' },
    { id: 18, name: 'Integração com Redes Sociais' },
    { id: 19, name: 'Otimização para SEO' },
    { id: 20, name: 'Suporte a Multilingue' },
];

const FeaturesStep = ({ features, setFeatures, setStep }) => {

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
                        checked={features.includes(feature.id)}
                        onChange={() => toggleFeature(feature.id)}
                    />
                    <label htmlFor={feature.id}>{feature.name}</label>
                </div>
            ))}

            <div className="step-buttons">
                <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Voltar</button>
                <button onClick={() => setStep((prev) => prev + 1)} type='button'>Continuar</button>
            </div>
        </section>
    );
};

export default FeaturesStep;
