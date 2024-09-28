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

        <p>
          Por favor, revise cuidadosamente todas as informações antes de submeter o formulário. O processo de revisão pode levar algum tempo, e qualquer erro ou informação faltante pode atrasar a aprovação do seu template. Para acelerar o processo, você pode optar pelo nosso serviço de Quick Queue, garantindo uma revisão mais rápida.
        </p>
        <p>
          Optando pelo serviço de Quick Queue, seu formulário será revisado com prioridade, economizando tempo e agilizando o processo de aprovação do seu site.
        </p>
        <button type="button" onClick={handleSubmitWithValidation} disabled={submitted}>
          Escolher Quick Queue
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
          {t('submit')}
        </button>
      </div>
    </>
  );
};

export default SiteLinksStep;
