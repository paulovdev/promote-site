import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import "./SiteLinksStep.scss";

const stripePromise = loadStripe('pk_test_51Q1x2cRraDIE2N6qbyls0V3OWLG43f6fV0O5rLdgZjyBQrcXTubZmvoxBX7DiPLmFHxBjOGsBWrJeb73jPYJftKO006qSKveLt');

const SiteLinksStep = ({ setStep, handleSubmit, selectedPlan }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    let isPaid = false;

    if (selectedPlan === 'paid') {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_1Q1ylSRraDIE2N6q1CPEIbBT', quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        console.error('Stripe Error:', error);
        setSubmitted(false);
      } else {
        isPaid = true; // Pagamento foi iniciado
      }
    } else {
      console.log('Plano gratuito selecionado, enviando...');
    }

    // Chama o handleSubmit aqui independentemente do pagamento
    handleSubmit(e, isPaid);
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
