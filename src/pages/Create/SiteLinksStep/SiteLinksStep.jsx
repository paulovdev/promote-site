import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import './SiteLinksStep.scss';

const stripePromise = loadStripe('pk_test_51Q1x2cRraDIE2N6qbyls0V3OWLG43f6fV0O5rLdgZjyBQrcXTubZmvoxBX7DiPLmFHxBjOGsBWrJeb73jPYJftKO006qSKveLt');

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    try {
      const response = await fetch('https://promote-site-back.vercel.app/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* dados necessários, se houver */ }),
      });

      const session = await response.json();

      // Redireciona para a sessão de checkout do Stripe
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Stripe Error:', error);
        return false; // Pagamento falhou
      }

      return true; // Pagamento iniciado com sucesso
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      return false; // Pagamento falhou
    }
  };



  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const paymentApproved = await handleStripePayment();
    if (paymentApproved) {
      console.log('Pagamento aprovado');
      await handleSubmit(e, true); // Certifique-se de que handleSubmit está corretamente implementado
    } else {
      console.log('Pagamento não aprovado');
    }
  };



  const handleNormalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, false); // Envia com hot: 0
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
