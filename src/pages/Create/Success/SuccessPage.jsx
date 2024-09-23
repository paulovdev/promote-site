// SuccessPage.jsx
import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

const SuccessPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sendEmail = async () => {
      console.log("Iniciando o envio do email...");

      const myName = sessionStorage.getItem('myName');
      const email = sessionStorage.getItem('email');
      const profileLink = sessionStorage.getItem('profileLink');
      const siteName = sessionStorage.getItem('siteName');
      const description = sessionStorage.getItem('description');
      const category = sessionStorage.getItem('category');
      const tool = sessionStorage.getItem('tool');
      const price = sessionStorage.getItem('price');
      const features = JSON.parse(sessionStorage.getItem('selectedFeatures'));
    
      const hot = sessionStorage.getItem('payment') === 'true' ? 1 : 0;

      console.log("Dados preparados para envio:", { myName, email, siteName, hot });

      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink,
        email,
        category,
        tool,
        siteName,
        description,
        sitePrice: price === '0' ? 'Free' : `$${price}`,
        features: features , // Converte para string se necessário
   
        hot:1
      };

      try {
        console.log("Enviando email...");
        await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
        console.log('Email enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar o email:', error);
      }

      // Limpar o sessionStorage após o envio
      sessionStorage.clear();
    };

    sendEmail();
  }, []);

  return (
    <div>
      <br /><br /><br />
      <h1>{t('success.title')}</h1>
      <p>{t('success.description')}</p>
    </div>
  );
};

export default SuccessPage;
