import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SiteLinksStep.scss';

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const createCheckoutSession = async () => {
    const response = await fetch('https://promote-site-back.vercel.app/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const session = await response.json();
    window.location.href = session.url;
    console.log(session)
    console.log(session.url)
  };

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await createCheckoutSession();
    } catch (error) {
      console.error('Error during submission:', error);
      setSubmitted(false);
    }
  };

  const handleNormalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <>
      <section id="site-links-step">

        <p>{t('agree.quickText1')} </p>
        <p>  {t('agree.quickText2')}  </p>
        <button type="button" onClick={handleSubmitWithValidation} disabled={submitted}>
          {t('agree.quickButton')} $4
        </button>

        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          {t('agree.confirmText')}
          <a href="/submission-guidelines">{t('agree.submissionGuidelines')}</a> {t('agree.agreement')}
        </label>

      </section>


      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button'>{t('tools.back')}</button>
        <button onClick={handleNormalSubmit} type='button'>
          {t('agree.submit')}
        </button>
      </div>
    </>
  );
};

export default SiteLinksStep;
