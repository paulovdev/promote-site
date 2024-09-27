import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import "./SuccessPage.scss";

const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    // Verificar o status do pagamento com o sessionId
    const checkPaymentStatus = async () => {
      const response = await fetch(`https://promote-site-back.vercel.app/check-payment-status?session_id=${sessionId}`);
      const data = await response.json();
      setPaymentStatus(data.status);
      console.log(data)
      console.log(data.status)
    };
    const sendEmail = async () => {
      const templateParams = {
        from_name: sessionStorage.getItem('myName'),
        to_name: 'Paulo Vitor',
        profileLink: sessionStorage.getItem('profileLink'),
        email: sessionStorage.getItem('email'),
        category: sessionStorage.getItem('category'),
        tool: sessionStorage.getItem('tool'),
        siteName: sessionStorage.getItem('siteName'),
        description: sessionStorage.getItem('description'),
        price: sessionStorage.getItem('price'),
        features: JSON.parse(sessionStorage.getItem('selectedFeatures')),
        hot: 1,
      };

      try {
        await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
        console.log('Email enviado com sucesso!');
        sessionStorage.clear();
      } catch (error) {
        setLogs([`Erro ao enviar email: ${error.message}`]);
      }
    };

    if (sessionId) {
     
      checkPaymentStatus();
    }
  }, []);

  return (
    <div id='success-section'>
      {paymentStatus === 'paid' ? (
        <h1>PAGAMENTO REALIZADO COM SUCESSO</h1>
      ) : (
        <h1>Pagamento ainda não confirmado.</h1>
      )}
    </div>
  );
};

export default SuccessPage;
