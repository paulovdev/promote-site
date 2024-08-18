import React, { useState } from 'react';
import './YourInfoStep.scss';
import { IoCloseOutline } from 'react-icons/io5';

const YourInfoStep = ({ myName, setMyName, email, setEmail, profileLink, setProfileLink, siteName, setSiteName, description, setDescription, setStep }) => {
  // State for validation errors
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

    if (!myName) newErrors.myName = 'Name is required';
    if (!email || !emailRegex.test(email)) newErrors.email = 'Valid email is required';
    if (!profileLink || !profileLinkRegex.test(profileLink)) newErrors.profileLink = 'Valid profile link is required';
    if (!siteName) newErrors.siteName = 'Site Name is required';
    if (description.length > 250) newErrors.description = 'Description should be under 250 characters';

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
          />
          <div className="error-message">
            {submitted && errors.myName && <p>{errors.myName}</p>}
          </div>
        </div>

        <div className="input-container">
          <label>E-mail<span>*</span></label>
          <input
            type="email"
            placeholder="paulo@gmail.com"
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
          <label>Profile link<span>*</span></label>
          <input
            type="text"
            placeholder="https://example.com"
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.profileLink && <p>{errors.profileLink}</p>}
          </div>
        </div>

        <div className="input-container">
          <label>Site Name<span>*</span></label>
          <input
            type="text"
            placeholder="Example Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
          <div className="error-message">
            {submitted && errors.siteName && <p>{errors.siteName}</p>}
          </div>
        </div>
      </div>

      <div className="input-container text-input">
        <label>Description<span>*</span></label>
        <textarea
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
        <div className="error-message">
          {submitted && errors.description && <p>{errors.description}</p>}
        </div>
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' disabled={true} className="back-button">Back</button>
        <button onClick={handleContinue} type='button' >Continue</button>
      </div>
    </section>
  );
};

export default YourInfoStep;
