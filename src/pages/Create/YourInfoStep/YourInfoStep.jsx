import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './YourInfoStep.scss';

const YourInfoStep = ({
  myName, setMyName, email, setEmail, profileLink, setProfileLink,
  siteName, setSiteName, description, setDescription, livePreview, setLivePreview,
  buyLink, setBuyLink, contactLink, setContactLink, setStep
}) => {
  const { t } = useTranslation();
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

    if (!myName) newErrors.myName = t('yourInfoStep.nameRequired');
    if (!email || !emailRegex.test(email)) newErrors.email = t('yourInfoStep.validEmail');
    if (!profileLink || !urlRegex.test(profileLink)) newErrors.profileLink = t('yourInfoStep.validProfileLink');
    if (!siteName) newErrors.siteName = t('yourInfoStep.siteNameRequired');
    if (description.length < 30) newErrors.description = t('yourInfoStep.descriptionLength');
    if (!livePreview || !urlRegex.test(livePreview)) newErrors.livePreview = t('yourInfoStep.validLivePreview');
    if (!buyLink || !urlRegex.test(buyLink)) newErrors.buyLink = t('yourInfoStep.validBuyLink');
    if (!contactLink || !urlRegex.test(contactLink)) newErrors.contactLink = t('yourInfoStep.validContactLink');

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
          <label>{t('yourInfoStep.nameLabel')}</label>
          <input
            type="text"
            placeholder="e.g., Paulo"
            value={myName}
            autoComplete="name"
            onChange={(e) => setMyName(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.myName && <p>{errors.myName}</p>}
          </div>
        </div>

        <div className="input-container">
          <label>{t('yourInfoStep.emailLabel')}</label>
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
          <label>{t('yourInfoStep.profileLinkLabel')}</label>
          <input
            type="text"
            placeholder="https://example.com"
            value={profileLink}
            autoComplete="link"
            onChange={(e) => setProfileLink(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.profileLink && <p>{errors.profileLink}</p>}
          </div>
        </div>

        <div className="input-container">
          <label>{t('yourInfoStep.contactLinkLabel')}</label>
          <input
            type="text"
            placeholder="https://contact-link.com"
            value={contactLink}
            onChange={(e) => setContactLink(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.contactLink && (<p>{errors.contactLink}</p>)}
          </div>
        </div>
      </div>

      <br />  <br />

      <div className="input-container">
        <label>{t('yourInfoStep.templateNameLabel')}</label>
        <input
          type="text"
          placeholder="e.g., Quimplo"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <div className="error-message">
          {submitted && errors.siteName && <p>{errors.siteName}</p>}
        </div>
      </div>

      <div className="input-container text-input">
        <label>{t('yourInfoStep.templateDescriptionLabel')}</label>
        <textarea
          placeholder="This template includes..."
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
          <label>{t('yourInfoStep.livePreviewLinkLabel')}</label>
          <input
            type="text"
            placeholder="https://preview-link.com"
            value={livePreview}
            onChange={(e) => setLivePreview(e.target.value)}
          />
          {submitted && errors.livePreview && (
            <div className="error-message"><p>{errors.livePreview}</p></div>
          )}
        </div>

        <div className="input-container">
          <label>{t('yourInfoStep.buyLinkLabel')}</label>
          <input
            type="text"
            placeholder="https://buy-link.com"
            value={buyLink}
            onChange={(e) => setBuyLink(e.target.value)}
          />
          {submitted && errors.buyLink && (
            <div className="error-message"><p>{errors.buyLink}</p></div>
          )}
        </div>
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' disabled={true} className="back-button">{t('yourInfoStep.back')}</button>
        <button onClick={handleContinue} type='button'>{t('yourInfoStep.continue')}</button>
      </div>
    </section>
  );
};

export default YourInfoStep;
