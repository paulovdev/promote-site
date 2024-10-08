import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import "./SuccessPage.scss";

const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [images, setImages] = useState(() => {
    const storedImages = sessionStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : [null, null, null];
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`https://promote-site-back.vercel.app/check-payment-status?session_id=${sessionId}`);
        const data = await response.json();
        setPaymentStatus(data.status);

        if (data.status === 'paid' && !localStorage.getItem(`emailSent_${sessionId}`)) {
          sendEmail(sessionId);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    const sendEmail = async (sessionId) => {
      const templateParams = {
        from_name: sessionStorage.getItem('myName'),
        to_name: 'Paulo Vitor',
        profileLink: sessionStorage.getItem('profileLink'),
        email: sessionStorage.getItem('email'),
        category: sessionStorage.getItem('category'),
        tool: sessionStorage.getItem('tool'),
        siteName: sessionStorage.getItem('siteName'),
        description: sessionStorage.getItem('description'),
        descriptionDetail: sessionStorage.getItem('descriptionDetail'),
        sitePrice: sessionStorage.getItem('price'),
        features: JSON.parse(sessionStorage.getItem('selectedFeatures')),
        livePreview: sessionStorage.getItem('livePreview'),
        buyLink: sessionStorage.getItem('buyLink'),
        contactLink: sessionStorage.getItem('contactLink'),
        imageURL1: images[0],
        imageURL2: images[1],
        imageURL3: images[2],
        hot: 1
      };

      try {
        await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
        console.log('Email enviado com sucesso!');
        
        for (const key in localStorage) {
          if (key.startsWith('emailSent_')) {
            localStorage.removeItem(key);
          }
        }
        
        localStorage.setItem(`emailSent_${sessionId}`, 'true');

        sessionStorage.clear();
      } catch (error) {
        console.error('Erro ao enviar email:', error);
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    }
  }, []);

  return (
    <div id='success-section'>
      {paymentStatus === 'paid' ? (
        <h1>Pagamento realizado com sucesso!</h1>
      ) : (
        <h1>Pagamento ainda não confirmado.</h1>
      )}
    </div>
  );
};

export default SuccessPage;
