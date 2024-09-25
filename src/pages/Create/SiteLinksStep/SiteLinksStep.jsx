import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import "./SiteLinksStep.scss";

const stripePromise = loadStripe('pk_live_51Q1x2cRraDIE2N6q15XgLA5G4Z3go22e8ZS9iNgTk6lJDpR6o8ibFAiqAezLo2qlDRrqeBx4f0IB9FTtJhyE0iTt00bd3RwdaQ');

const SiteLinksStep = ({ setStep, handleSubmit }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const createCheckoutSession = async () => {
    const response = await fetch('https://promote-site-back.vercel.app/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: async (data) => {
      const stripe = await stripePromise; // Certificando que o stripe seja carregado corretamente
      sessionStorage.setItem('session_id', data.id); // Armazena o session_id
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id }); // Redireciona para a sessão de checkout
      if (error) {
        console.error('Erro ao redirecionar para o checkout:', error);
      }
    },
    onError: (error) => {
      console.error('Error creating checkout session:', error);
    },
  });

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const { session } = await mutation.mutateAsync(); // Chama a mutação para criar a sessão de checkout
      sessionStorage.setItem('checkout_session', JSON.stringify(session)); // Salva a sessão no sessionStorage
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  const handleNormalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, false); // Chame o handleSubmit com false para indicar que não houve pagamento
  };

  return (
    <>
      <section id="site-links-step">
        <input type='checkbox' id="terms" />
        <label htmlFor="terms">
          {t('agree.confirmText')}
          <a href="/submission-guidelines">{t('agree.submissionGuidelines')}</a> {t('agree.agreement')}
        </label>
        <button type='button' onClick={handleSubmitWithValidation} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Processando...' : 'PAGAR PARA IR MAIS RÁPIDO'}
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
