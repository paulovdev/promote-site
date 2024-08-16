import React from 'react';
import "./YourInfoStep.scss"

const YourInfoStep = ({ myName, setMyName, email, setEmail, profileLink, setProfileLink, setStep }) => {
  return (
    <section id="your-info-step">
      <h3>Your info</h3>
      <p>Provide your name, email, and profile link to get started.</p>

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

      <div className="input-container">
        <label>Profile link<span>*</span></label>
        <input
          type="text"
          placeholder="https://example.com"
          value={profileLink}
          onChange={(e) => setProfileLink(e.target.value)}
        />
      </div>

      <div className="step-buttons">
        <button disabled onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default YourInfoStep;
