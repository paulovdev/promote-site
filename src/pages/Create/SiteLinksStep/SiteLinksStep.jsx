import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import './SiteLinksStep.scss';

const stripePromise = loadStripe('pk_test_51Q1x2cRraDIE2N6qbyls0V3OWLG43f6fV0O5rLdgZjyBQrcXTubZmvoxBX7DiPLmFHxBjOGsBWrJeb73jPYJftKO006qSKveLt'); // Replace with your publishable key

const SiteLinksStep = ({ setStep, handleSubmit, isPaid }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

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

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Stripe Error:', error);
        setPaymentError(error.message); // Set a user-friendly error message
        return false;
      }

      return true; // Payment initiated successfully
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      setPaymentError('An error occurred while creating the payment session. Please try again later.'); // Set a user-friendly error message
      return false;
    }
  };

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validação do formulário aqui
    // ... sua lógica de validação ...

    if (paymentError) {
      // Exibir erro de pagamento se houver
      return;
    }

    const paymentApproved = await handleStripePayment();
    if (paymentApproved) {
      console.log('Pagamento aprovado'); // Log para depuração

      // Enviar os dados do formulário para o seu backend para processamento
      const formData = new FormData(e.target); // Extrair dados do formulário
      await handleSubmit(formData, true); // Passando true para indicar pagamento

      // Exibir o modal de sucesso
      setShowSuccessModal(true);
    } else {
      console.log('Pagamento não aprovado'); // Log para depuração
    }
  };


  const handleNormalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(new FormData(e.target), false); // Send form data with isPaid=0 for free submission
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
          PAGAR PARA IR MAIS RÁPTO
        </button>
        {paymentError && <p className="error-message">{paymentError}</p>} {/* Display payment error message */}
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