import React, { useState } from 'react';
import './YourInfoStep.scss';

const YourInfoStep = ({
  myName, setMyName, email, setEmail, profileLink, setProfileLink,
  siteName, setSiteName, description, setDescription, livePreview, setLivePreview,
  buyLink, setBuyLink, contactLink, setContactLink, setStep
}) => {
  const [errors, setErrors] = useState({
    myName: '',
    email: '',
    profileLink: '',
    siteName: '',
    description: '',
    livePreview: '',
    buyLink: '',
    contactLink: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^https?:\/\/.+/;

  const validate = () => {
    const newErrors = {};

    if (!myName) newErrors.myName = 'O nome é obrigatório';
    if (!email || !emailRegex.test(email)) newErrors.email = 'Um e-mail válido é obrigatório';
    if (!profileLink || !urlRegex.test(profileLink)) newErrors.profileLink = 'Um link de perfil válido é obrigatório';
    if (!siteName) newErrors.siteName = 'O nome do site é obrigatório';
    if (description.length < 30) newErrors.description = 'A descrição deve ter mais de 30 caracteres';
    if (!livePreview || !urlRegex.test(livePreview)) newErrors.livePreview = 'Um link válido para a Visualização ao Vivo é obrigatório';
    if (!buyLink || !urlRegex.test(buyLink)) newErrors.buyLink = 'Um link válido para Compra é obrigatório';
    if (!contactLink || !urlRegex.test(contactLink)) newErrors.contactLink = 'Um link válido para Contato é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (validate()) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <section id="your-info-step">
      <div className="input-grid">

        <div className="input-container">
          <label>Seu nome</label>
          <input
            type="text"
            placeholder="Ex: Paulo"
            value={myName}
            autocomplete="name"
            onChange={(e) => setMyName(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.myName && <p>{errors.myName}</p>}
          </div>
        </div>

        <div className="input-container">
          <label>Seu e-mail</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.email && <p>{errors.email}</p>}
          </div>
        </div>
      </div>

      <div className="input-grid">
        <div className="input-container">
          <label>Link do seu perfil</label>
          <input
            type="text"
            placeholder="https://example.com"
            value={profileLink}
            autocomplete="link"
            onChange={(e) => setProfileLink(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.profileLink && <p>{errors.profileLink}</p>}
          </div>
        </div>


        <div className="input-container">
          <label>Link de contato</label>
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
      </div>

      <br />  <br />

      <div className="input-container">
        <label>Nome do template</label>
        <input
          type="text"
          placeholder="Ex: Quimplo"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <div className="error-message">
          {submitted && errors.siteName && <p>{errors.siteName}</p>}
        </div>
      </div>

      <div className="input-container text-input">
        <label>Descrição do template</label>
        <textarea
          placeholder="Este template contém..."
          value={description}
          maxLength={250}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="error-message">
          {submitted && errors.description && <p>{errors.description}</p>}
        </div>
      </div>

      <br />  <br />

      <div className="input-grid">
        <div className="input-container">
          <label>Link para visualização ao vivo</label>
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
          <label>Link de compra</label>
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






      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' disabled={true} className="back-button">Voltar</button>
        <button onClick={handleContinue} type='button'>Continuar</button>
      </div>
    </section>
  );
};

export default YourInfoStep;
