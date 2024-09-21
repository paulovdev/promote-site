import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './YourInfoStep.scss';

const YourInfoStep = ({
  myName: initialMyName,
  setMyName,
  email: initialEmail,
  setEmail,
  profileLink: initialProfileLink,
  setProfileLink,
  siteName: initialSiteName,
  setSiteName,
  description: initialDescription,
  setDescription,
  livePreview: initialLivePreview,
  setLivePreview,
  buyLink: initialBuyLink,
  setBuyLink,
  contactLink: initialContactLink,
  setContactLink,
  price: initialPrice,
  setPrice,
  setStep
}) => {
  const { t } = useTranslation();

  const [myName, setMyNameState] = useState(initialMyName || sessionStorage.getItem('myName') || '');
  const [email, setEmailState] = useState(initialEmail || sessionStorage.getItem('email') || '');
  const [profileLink, setProfileLinkState] = useState(initialProfileLink || sessionStorage.getItem('profileLink') || '');
  const [siteName, setSiteNameState] = useState(initialSiteName || sessionStorage.getItem('siteName') || '');
  const [description, setDescriptionState] = useState(initialDescription || sessionStorage.getItem('description') || '');
  const [livePreview, setLivePreviewState] = useState(initialLivePreview || sessionStorage.getItem('livePreview') || '');
  const [buyLink, setBuyLinkState] = useState(initialBuyLink || sessionStorage.getItem('buyLink') || '');
  const [contactLink, setContactLinkState] = useState(initialContactLink || sessionStorage.getItem('contactLink') || '');
  const [price, setPriceState] = useState(Number(initialPrice) || Number(sessionStorage.getItem('price')) || 0);

  const [errors, setErrors] = useState({
    myName: '',
    email: '',
    profileLink: '',
    siteName: '',
    description: '',
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
            <label>{t('yourInfoStep.nameLabel')}</label>
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
              {submitted && errors.myName && <p>{errors.myName}</p>}
            </div>
          </div>

          <div className="input-container">
            <label>{t('yourInfoStep.emailLabel')}</label>
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
              onChange={(e) => {
                setProfileLinkState(e.target.value);
                setProfileLink(e.target.value);
              }}
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
              onChange={(e) => {
                setContactLinkState(e.target.value);
                setContactLink(e.target.value);
              }}
            />
            <div className="error-message">
              {submitted && errors.contactLink && <p>{errors.contactLink}</p>}
            </div>
          </div>
        </div>

        <br />  <hr />   <br />
        <div className="input-grid">
          <div className="input-container">
            <label>{t('yourInfoStep.templateNameLabel')}</label>
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
              {submitted && errors.siteName && <p>{errors.siteName}</p>}
            </div>
          </div>

          <div className="input-container">
            <label className='price-text'>{t('yourInfoStep.price')}: {price === 0 ? `${t('price.free')}` : <>${price}</>}</label>
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
            <div className="error-message">
              {submitted && errors.price && <p>{errors.price}</p>}
            </div>
          </div>
        </div>

        <div className="input-container text-input">
          <label>{t('yourInfoStep.templateDescriptionLabel')}</label>
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
            {submitted && errors.description && <p>{errors.description}</p>}
          </div>
        </div>

        <br />  <hr />   <br />

        <div className="input-grid">
          <div className="input-container">
            <label>{t('yourInfoStep.livePreviewLinkLabel')}</label>
            <input
              type="text"
              placeholder="https://preview-link.com"
              value={livePreview}
              onChange={(e) => {
                setLivePreviewState(e.target.value);
                setLivePreview(e.target.value);
              }}
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
              onChange={(e) => {
                setBuyLinkState(e.target.value);
                setBuyLink(e.target.value);
              }}
            />
            {submitted && errors.buyLink && (
              <div className="error-message"><p>{errors.buyLink}</p></div>
            )}
          </div>
        </div>
      </section>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' disabled={true} className="back-button">{t('yourInfoStep.back')}</button>
        <button onClick={handleContinue} type='button'>{t('yourInfoStep.continue')}</button>
      </div>
    </>
  );
};

export default YourInfoStep;
