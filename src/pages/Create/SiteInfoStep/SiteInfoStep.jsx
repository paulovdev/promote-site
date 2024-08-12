import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import "./SiteInfoStep.scss"
const SiteInfoStep = ({ siteName, setSiteName, description, setDescription, setStep }) => {
  return (
    <section id="site-info-step">
      <h3>Site Info</h3>
      <p>Enter the name and description of your site. This helps users understand what your site is about.</p>

      <div className="input-container">
        <label>Site Name<span>*</span></label>
        <input
          type="text"
          placeholder="Example Name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          required
        />
      </div>

      <div className="input-container text-input">
        <label>Description<span>*</span></label>
        <textarea
          type="text"
          placeholder="This website contains..."
          value={description}
          maxLength={250}
          onChange={(e) => setDescription(e.target.value)}
        />
        {description && (
          <span onClick={() => setDescription('')}>
            <IoCloseOutline size={24} />
          </span>
        )}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default SiteInfoStep;
