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
      await createCheckoutSession(); // Espera pela criação da sessão
    } catch (error) {
      console.error('Error during submission:', error);
      setSubmitted(false); // Reseta o estado se ocorrer um erro
    }
  };

  const handleNormalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <>
      <section id="site-links-step">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          {t('agree.confirmText')}
          <a href="/submission-guidelines">{t('agree.submissionGuidelines')}</a> {t('agree.agreement')}
        </label>
        <button type="button" onClick={handleSubmitWithValidation} disabled={submitted}>
          PAGAR PARA IR MAIS RÁPIDO
        </button>
      </section>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button'>{t('tools.back')}</button>
        <button onClick={handleNormalSubmit} type='button'>
          {t('submit')}
        </button>
      </div>
    </>
  );
};

export default SiteLinksStep;
