import React, { useState } from 'react';
import "./SiteLinksStep.scss";

const SiteLinksStep = ({ livePreview, setLivePreview, buyLink, setBuyLink, contactLink, setContactLink, step, setStep, handleSubmit }) => {
  // Estado para validação de erros
  const [errors, setErrors] = useState({
    livePreview: '',
    buyLink: '',
    contactLink: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const urlRegex = /^https?:\/\/.+/;

  const validate = () => {
    const newErrors = {};
    if (!urlRegex.test(livePreview)) newErrors.livePreview = 'É necessário um link válido para a Visualização ao Vivo';
    if (!urlRegex.test(buyLink)) newErrors.buyLink = 'É necessário um link válido para Compra';
    if (!urlRegex.test(contactLink)) newErrors.contactLink = 'É necessário um link válido para Contato';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      handleSubmit(e);
    }
  };

  return (
    <section id="site-links-step">
      <p>Forneça os links onde os usuários podem visualizar, comprar ou entrar em contato sobre seu site.</p>

      <div className="input-grid">
        <div className="input-container">
          <label>Link para Visualização ao Vivo<span>*</span></label>
          <input
            type="text"
            placeholder="https://link-de-visualizacao.com"
            value={livePreview}
            onChange={(e) => setLivePreview(e.target.value)}
          />
          {submitted && errors.livePreview && (
            <div className="error-message"><p>{errors.livePreview}</p></div>
          )}
        </div>

        <div className="input-container">
          <label>Link de Compra<span>*</span></label>
          <input
            type="text"
            placeholder="https://link-de-compra.com"
            value={buyLink}
            onChange={(e) => setBuyLink(e.target.value)}
          />
          {submitted && errors.buyLink && (
            <div className="error-message"><p>{errors.buyLink}</p></div>
          )}
        </div>
      </div>

      <div className="input-container">
        <label>Link de Contato<span>*</span></label>
        <input
          type="text"
          placeholder="https://link-de-contato.com"
          value={contactLink}
          onChange={(e) => setContactLink(e.target.value)}
        />
        {submitted && errors.contactLink && (
          <div className="error-message"><p>{errors.contactLink}</p></div>
        )}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Voltar</button>
        <button onClick={handleSubmitWithValidation} type='button' >Enviar</button>
      </div>
    </section>
  );
};

export default SiteLinksStep;
