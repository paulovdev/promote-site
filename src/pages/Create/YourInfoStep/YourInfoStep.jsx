import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


import { FaExclamationCircle } from "react-icons/fa";

import './YourInfoStep.scss';

const YourInfoStep = ({ setStep }) => {
  const { t } = useTranslation()

  const [myName, setMyNameState] = useState(sessionStorage.getItem('myName') || '');
  const [email, setEmailState] = useState(sessionStorage.getItem('email') || '');
  const [profileLink, setProfileLinkState] = useState(sessionStorage.getItem('profileLink') || '');
  const [siteName, setSiteNameState] = useState(sessionStorage.getItem('siteName') || '');
  const [description, setDescriptionState] = useState(sessionStorage.getItem('description') || '');
  const [livePreview, setLivePreviewState] = useState(sessionStorage.getItem('livePreview') || '');
  const [buyLink, setBuyLinkState] = useState(sessionStorage.getItem('buyLink') || '');
  const [contactLink, setContactLinkState] = useState(sessionStorage.getItem('contactLink') || '');
  const [price, setPriceState] = useState(Number(sessionStorage.getItem('price')) || 0);

  const [errors, setErrors] = useState({
    myName: '',
    email: '',
    profileLink: '',
    siteName: '',
    description: '',
    description2: '',
    livePreview: '',
    buyLink: '',
    contactLink: '',
    price: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^https?:\/\/.+/;

  useEffect(() => {
    sessionStorage.setItem('myName', myName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('profileLink', profileLink);
    sessionStorage.setItem('siteName', siteName);
    sessionStorage.setItem('description', description);
    sessionStorage.setItem('livePreview', livePreview);
    sessionStorage.setItem('buyLink', buyLink);
    sessionStorage.setItem('contactLink', contactLink);
    sessionStorage.setItem('price', price.toString());
  }, [myName, email, profileLink, siteName, description, livePreview, buyLink, contactLink, price]);

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
    if (price < 0 || price > 1000) newErrors.price = t('yourInfoStep.validPrice');

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
    <>
      <section id="your-info-step">
        <div className="input-grid">
          <div className="input-container">
            <label>
              {t('yourInfoStep.nameLabel')}
              <p>{t('yourInfoStep.nameInfo')}</p>
            </label>
            <input
              type="text"
              placeholder="e.g., Paulo"
              value={myName}
              autoComplete="name"
              onChange={(e) => {
                setMyNameState(e.target.value);
                setMyName(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.myName && <p><FaExclamationCircle />{errors.myName}</p>}
            </div>
          </div>

          <div className="input-container">
            <label>
              {t('yourInfoStep.emailLabel')}
              <p>{t('yourInfoStep.emailInfo')}</p>
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmailState(e.target.value);
                setEmail(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.email && <p><FaExclamationCircle />{errors.email}</p>}
            </div>
          </div>
        </div>

        <div className="input-grid">
          <div className="input-container">
            <label>
              {t('yourInfoStep.profileLinkLabel')}
              <p>{t('yourInfoStep.profileLinkInfo')}</p>
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              value={profileLink}
              autoComplete="link"
              onChange={(e) => {
                setProfileLinkState(e.target.value);
                setProfileLink(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.profileLink && <p><FaExclamationCircle />{errors.profileLink}</p>}
            </div>
          </div>

          <div className="input-container">
            <label>
              {t('yourInfoStep.contactLinkLabel')}
              <p>{t('yourInfoStep.contactLinkInfo')}</p>
            </label>
            <input
              type="text"
              placeholder="https://contact-link.com"
              value={contactLink}
              onChange={(e) => {
                setContactLinkState(e.target.value);
                setContactLink(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.contactLink && <p><FaExclamationCircle />{errors.contactLink}</p>}
            </div>
          </div>
        </div>

        <br />  <hr />   <br />

        <div className="step-info">
          <span>{t('create.steps.1.span')}</span>
          <h1>{t('create.steps.1.title2')}</h1>
          <p>{t('create.steps.1.description2')}</p>
        </div>

        <div className="input-grid">
          <div className="input-container">
            <label>
              {t('yourInfoStep.templateNameLabel')}
              <p>{t('yourInfoStep.templateNameInfo')}</p>
            </label>
            <input
              type="text"
              placeholder="e.g., Quimplo"
              value={siteName}
              onChange={(e) => {
                setSiteNameState(e.target.value);
                setSiteName(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.siteName && <p><FaExclamationCircle />{errors.siteName}</p>}
            </div>
          </div>

          <div className="input-container">
            <label className='price-text'>
              {t('yourInfoStep.price')}
              <p>{t('yourInfoStep.priceInfo')}</p>
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              step="5"
              value={price}
              onChange={(e) => {
                setPriceState(Number(e.target.value));
                setPrice(Number(e.target.value));
              }}
            />

            <div className="error-message"><p className='pricing-p'>{t('yourInfoStep.price')}: {price === 0 ? `${t('price.free')}` : <>${price}</>}</p></div>

          </div>
        </div>

        {/* description */}
        <div className="input-container text-input">
          <label>
            {t('yourInfoStep.templateDescriptionLabel')}
            <p>{t('yourInfoStep.templateDescriptionInfo')}</p>
          </label>
          <textarea
            placeholder="This template includes..."
            value={description}

            maxLength={250}
            onChange={(e) => {
              setDescriptionState(e.target.value);
              setDescription(e.target.value);
            }}
          />
          <div className="error-message">
            {submitted && errors.description && <p><FaExclamationCircle />{errors.description}</p>}
          </div>
        </div>

        <br />  <hr />   <br />

        <div className="step-info">
          <span>{t('create.steps.1.span')}</span>
          <h1>{t('create.steps.1.title3')}</h1>
          <p>{t('create.steps.1.description3')}</p>
        </div>

        <div className="input-grid">
          <div className="input-container">
            <label>
              {t('yourInfoStep.livePreviewLabel')}
              <p>{t('yourInfoStep.livePreviewInfo')}</p>
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              value={livePreview}
              onChange={(e) => {
                setLivePreviewState(e.target.value);
                setLivePreview(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.livePreview && <p><FaExclamationCircle />{errors.livePreview}</p>}
            </div>
          </div>
        
          <div className="input-container">
            <label>
              {t('yourInfoStep.buyLinkLabel')}
              <p>{t('yourInfoStep.buyLinkInfo')}</p>
            </label>
            <input
              type="text"
              placeholder="https://LemonSqueezy, Gumroad, Payhip/"
              value={buyLink}
              onChange={(e) => {
                setBuyLinkState(e.target.value);
                setBuyLink(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.buyLink && <p><FaExclamationCircle />{errors.buyLink}</p>}
            </div>

          </div>
        </div>
      </section >

      <div className="step-buttons">
        <button type="button" className="secondary-button" disabled>
          {t('yourInfoStep.back')}
        </button>
        <button type="button" className="primary-button" onClick={handleContinue}>
          {t('yourInfoStep.continue')}
        </button>
      </div>
    </>
  );
};

export default YourInfoStep;
