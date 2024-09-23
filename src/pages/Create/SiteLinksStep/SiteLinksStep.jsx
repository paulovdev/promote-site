import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./SiteLinksStep.scss";

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    setSubmitted(true);
    handleSubmit(e);
  };

  return (
    <>
      <section id="site-links-step">
        <input
          type='checkbox'
          id="terms"
        />
        <label htmlFor="terms">
          {t('agree.confirmText')}
          <a href="/submission-guidelines">{t('agree.submissionGuidelines')}</a> {t('and')} {t('agree.agreement')}
        </label>
      </section>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">
          {t('agree.back')}
        </button>
        <button onClick={handleSubmitWithValidation} type='button'>
          {t('agree.submit')}
        </button>
      </div>
    </>
  );
};

export default SiteLinksStep;
