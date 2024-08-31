import React, { useState } from 'react';
import './YourInfoStep.scss';
import { IoCloseOutline } from 'react-icons/io5';

const YourInfoStep = ({ myName, setMyName, email, setEmail, profileLink, setProfileLink, siteName, setSiteName, description, setDescription, setStep }) => {
  // Estado para erros de validação
  const [errors, setErrors] = useState({
    myName: '',
    email: '',
    profileLink: '',
    siteName: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const profileLinkRegex = /^https?:\/\/.+/;

  const validate = () => {
    const newErrors = {};

    if (!myName) newErrors.myName = 'O nome é obrigatório';
    if (!email || !emailRegex.test(email)) newErrors.email = 'Um e-mail válido é obrigatório';
    if (!profileLink || !profileLinkRegex.test(profileLink)) newErrors.profileLink = 'Um link de perfil válido é obrigatório';
    if (!siteName) newErrors.siteName = 'O nome do site é obrigatório';
    if (description.length > 250) newErrors.description = 'A descrição deve ter menos de 250 caracteres';

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
          <label>Nome</label>
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
          <label>E-mail</label>
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
          <label>Link do Perfil</label>
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
          <label>Nome do Site</label>
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
      </div>

      <div className="input-container text-input">
        <label>Descrição</label>
        <textarea
          placeholder="Este site contém..."
          value={description}
          maxLength={250}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="error-message">
          {submitted && errors.description && <p>{errors.description}</p>}
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
