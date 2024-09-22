import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import "./SiteLinksStep.scss";

const stripePromise = loadStripe('pk_live_51Q1x2cRraDIE2N6q15XgLA5G4Z3go22e8ZS9iNgTk6lJDpR6o8ibFAiqAezLo2qlDRrqeBx4f0IB9FTtJhyE0iTt00bd3RwdaQ');

const SiteLinksStep = ({ setStep, handleSubmit, selectedPlan }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  console.log('Plano selecionado:', selectedPlan);

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (selectedPlan === 'paid') {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_1Q1xaRRraDIE2N6q9jbVuWXo', quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });
      handleSubmit(e);
      console.log("plano pago ")
      if (error) {
        console.error('Stripe Error:', error);
        setSubmitted(false);
      }
    } else {
      console.log('Plano gratuito selecionado, enviando...');
      handleSubmit(e);
    }
  };

  return (
    <>
      <section id="site-links-step">
        <input type='checkbox' id="terms" />
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
