import React from 'react';
import "./YourInfoStep.scss"

const YourInfoStep = ({ myName, setMyName, email, setEmail, profileLink, setProfileLink, siteName, setSiteName, description, setDescription, setStep }) => {
  return (
    <section id="your-info-step">
 
      <h3>Your info & Site Info</h3>
      <p>Provide your name, email, profile link, name and description of your site. This helps users understand what your site is about.</p>

      <div className="input-grid">
        <div className="input-container">
          <label>Name<span>*</span></label>
          <input
            type="text"
            placeholder="Paulo*"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label>E-mail<span>*</span></label>
          <input
            type="text"
            placeholder="paulo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="input-grid">
        <div className="input-container">
          <label>Profile link<span>*</span></label>
          <input
            type="text"
            placeholder="https://example.com"
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
          />
        </div>

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
        <button disabled onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default YourInfoStep;
