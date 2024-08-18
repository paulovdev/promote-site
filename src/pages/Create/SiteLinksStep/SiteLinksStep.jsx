import React, { useState } from 'react';
import "./SiteLinksStep.scss";

const SiteLinksStep = ({ livePreview, setLivePreview, buyLink, setBuyLink, contactLink, setContactLink, step, setStep, handleSubmit }) => {
  // State for validation errors
  const [errors, setErrors] = useState({
    livePreview: '',
    buyLink: '',
    contactLink: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const urlRegex = /^https?:\/\/.+/;

  const validate = () => {
    const newErrors = {};
    if (!urlRegex.test(livePreview)) newErrors.livePreview = 'Valid Live Preview Link is required';
    if (!urlRegex.test(buyLink)) newErrors.buyLink = 'Valid Buy Link is required';
    if (!urlRegex.test(contactLink)) newErrors.contactLink = 'Valid Contact Link is required';

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
      <h3>Site Links</h3>
      <p>Provide the links where users can preview, buy, or contact you about your site.</p>

      <div className="input-grid">
        <div className="input-container">
          <label>Live Preview Link<span>*</span></label>
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
          <label>Buy Link<span>*</span></label>
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

      <div className="input-container">
        <label>Contact Link<span>*</span></label>
        <input
          type="text"
          placeholder="https://link-to-contact.com"
          value={contactLink}
          onChange={(e) => setContactLink(e.target.value)}
        />
        {submitted && errors.contactLink && (
          <div className="error-message"><p>{errors.contactLink}</p></div>
        )}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Back</button>
        <button onClick={handleSubmitWithValidation} type='button' >Submit</button>
      </div>
    </section>
  );
};

export default SiteLinksStep;
