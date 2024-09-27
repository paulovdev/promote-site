import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q1x2cRraDIE2N6qbyls0V3OWLG43f6fV0O5rLdgZjyBQrcXTubZmvoxBX7DiPLmFHxBjOGsBWrJeb73jPYJftKO006qSKveLt'); // Sua chave pública

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = async () => {
    // Chamada à sua API para criar o Payment Intent e obter o clientSecret
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data.clientSecret; // O clientSecret deve vir da sua API
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      const clientSecret = await createPaymentIntent();
      if (stripe && elements) {
        stripe.elements({ clientSecret });
      }
    };

    fetchClientSecret();
  }, [stripe, elements]);

  // Definindo a função handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Certifique-se de que o Stripe e os elementos estão carregados
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirecionar após o pagamento
        return_url: 'http://localhost:5273/success', // Altere para a URL de sucesso
      },
    });

    if (result.error) {
      // Mostre o erro ao usuário
      console.error(result.error.message);
    } else {
      // O pagamento foi bem-sucedido
      console.log('Pagamento realizado com sucesso!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
    </form>
  );
};

// Componente principal
const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={1000} /> {/* Exemplo de valor em centavos */}
  </Elements>
);

export default PaymentPage;
