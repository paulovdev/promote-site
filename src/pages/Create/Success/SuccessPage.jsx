import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

const SuccessPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const session_id = sessionStorage.getItem('session_id');

      if (session_id) {
        const response = await fetch('https://promote-site-back.vercel.app/check-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id }), // Enviando o session_id corretamente
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          console.error("Erro ao verificar o status do pagamento:", errorMessage);
          return;
        }

        const data = await response.json();

        if (data.isPaid) {
          await sendEmail();
        } else {
          console.log("Pagamento não confirmado, não enviando email.");
        }
      } else {
        console.error("session_id não encontrado no sessionStorage.");
      }
    };

    const sendEmail = async () => {
      const myName = sessionStorage.getItem('myName');
      const email = sessionStorage.getItem('email');
      const profileLink = sessionStorage.getItem('profileLink');
      const siteName = sessionStorage.getItem('siteName');
      const description = sessionStorage.getItem('description');
      const category = sessionStorage.getItem('category');
      const tool = sessionStorage.getItem('tool');
      const price = sessionStorage.getItem('price');
      const features = JSON.parse(sessionStorage.getItem('selectedFeatures'));
      const hot = 1;

      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink,
        email,
        category,
        tool,
        siteName,
        description,
        price,
        features,
        hot,
      };

      try {
        await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
        console.log("Email enviado com sucesso!");
        sessionStorage.clear();
      } catch (error) {
        console.error("Erro ao enviar email:", error);
      }
    };

    checkPaymentStatus();
  }, []);

  return (
    <div>
      <h1>{t('successPage.title')}</h1>
      <p>{t('successPage.message')}</p>
    </div>
  );
};

export default SuccessPage;
