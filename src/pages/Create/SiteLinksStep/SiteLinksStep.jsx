import React, { useState } from 'react';
import "./SiteLinksStep.scss";

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      handleSubmit(e);
    }
  };

  return (
    <section id="site-links-step">
      <input
        type='checkbox'
        id="terms"
      />
      <label htmlFor="terms">  Eu confirmo que o template está em conformidade com as <a> diretrizes de submissão</a> e com o acordo do Quimplo.</label>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">
          Voltar
        </button>
        <button onClick={handleSubmitWithValidation} type='button'>
          Enviar
        </button>
      </div>
    </section>
  );
};

export default SiteLinksStep;
