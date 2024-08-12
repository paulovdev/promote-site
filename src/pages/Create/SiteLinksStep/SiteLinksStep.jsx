import React from 'react';
import "./SiteLinksStep.scss"
const SiteLinksStep = ({ livePreview, setLivePreview, buyLink, setBuyLink, contactLink, setContactLink, step, setStep, handleSubmit }) => {
  return (
    <section id="site-links-step">
      <h3>Site Links</h3>
      <p>Provide the links where users can preview, buy, or contact you about your site.</p>

      <div className="input-container">
        <label>Live Preview Link<span>*</span></label>
        <input
          type="text"
          placeholder="https://preview-link.com"
          value={livePreview}
          onChange={(e) => setLivePreview(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <label>Buy Link<span>*</span></label>
        <input
          type="text"
          placeholder="https://buy-link.com"
          value={buyLink}
          onChange={(e) => setBuyLink(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <label>Contact Link<span>*</span></label>
        <input
          type="text"
          placeholder="https://link-to-contact.com"
          value={contactLink}
          onChange={(e) => setContactLink(e.target.value)}
          required
        />
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </section>
  );
};

export default SiteLinksStep;
