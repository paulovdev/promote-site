// SiteLinksStep.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q1x2cRraDIE2N6qbyls0V3OWLG43f6fV0O5rLdgZjyBQrcXTubZmvoxBX7DiPLmFHxBjOGsBWrJeb73jPYJftKO006qSKveLt');

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1Q1ylSRraDIE2N6q1CPEIbBT', quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  
    if (error) {
      console.error('Stripe Error:', error);
      return false; // Pagamento falhou
    }
  
       return true; // Pagamento aprovado
  };

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);

  await handleStripePayment(); // Verifica se o pagamento foi aprovado


};


  const handleNormalSubmit = (e) => {
    e.preventDefault();
    // Chame o handleSubmit com false para indicar que não houve pagamento
    handleSubmit(e, false);
  };

  return (
    <>
      <section id="site-links-step">
        <input type='checkbox' id="terms" />
        <label htmlFor="terms">
          {t('agree.confirmText')}
          <a href="/submission-guidelines">{t('agree.submissionGuidelines')}</a> {t('and')} {t('agree.agreement')}
        </label>
        <button onClick={handleSubmitWithValidation} type='button'>
          PAGAR PARA IR MAIS RÁPIDO
        </button>
      </section>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">
          {t('agree.back')}
        </button>
        <button onClick={handleNormalSubmit} type='button'>
          {t('agree.submit')}
        </button>
      </div>
    </>
  );
};

export default SiteLinksStep;
