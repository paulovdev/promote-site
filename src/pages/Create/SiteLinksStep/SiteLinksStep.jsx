import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import './SiteLinksStep.scss';

const stripePromise = loadStripe('pk_test_51Q1x2cRraDIE2N6qbyls0V3OWLG43f6fV0O5rLdgZjyBQrcXTubZmvoxBX7DiPLmFHxBjOGsBWrJeb73jPYJftKO006qSKveLt');

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const createCheckoutSession = async () => {
    const response = await fetch('http://localhost:3000/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  };

  const mutation = useMutation(createCheckoutSession, {
    onSuccess: async (data) => { // Torne a função assíncrona
      const stripe = await stripePromise; // Use await aqui
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error('Stripe Error:', error);
      }
    },
    onError: (error) => {
      console.error('Erro ao criar sessão de checkout:', error);
    },
  });

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Inicia o pagamento
    mutation.mutate();
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
        <button onClick={() => handleSubmit(e, false)} type='button'>
          {t('agree.submit')}
        </button>
      </div>
    </>
  );
};

export default SiteLinksStep;
