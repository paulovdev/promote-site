import React, { useState, useRef, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { Helmet } from 'react-helmet';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Firebase';
import { IoCloseOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { BiLastPage } from "react-icons/bi";
import YourInfoStep from './YourInfoStep/YourInfoStep';
import CategoryStep from './CategoryStep/CategoryStep';
import ToolStep from './ToolStep/ToolStep';
import ImageStep from './ImageStep/ImageStep';
import SiteLinksStep from './SiteLinksStep/SiteLinksStep';
import FeaturesStep from './FeaturesStep/FeaturesStep';
import Price from '../../components/Price/Price';
import "./Create.scss";

const Create = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(() => {
    const savedStep = sessionStorage.getItem('currentStep');
    return savedStep ? Number(savedStep) : 1;
  });
  const [reset, setReset] = useState(false)
  const [myName, setMyName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [siteName, setSiteName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tool, setTool] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('500');
  const [livePreview, setLivePreview] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [features, setFeatures] = useState([]);
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(() => {
    const savedShowModal = sessionStorage.getItem('showModal');
    return savedShowModal !== null ? JSON.parse(savedShowModal) : false;
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    document.body.classList.toggle('no-scroll', showModal);
  }, [showModal]);

  // Salva o passo atual no sessionStorage sempre que ele mudar
  useEffect(() => {
    sessionStorage.setItem('currentStep', step);
  }, [step]);

  useEffect(() => {
    sessionStorage.setItem('showModal', JSON.stringify(showModal));
  }, [showModal]);

  const debouncedSetStep = useCallback(
    debounce((newStep) => setStep(newStep), 300),
    []
  );

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setIsPhotoValid(true);
    } else {
      setIsPhotoValid(false);
    }
  };

  const handleSubmit = async (e, isPaid) => {
    e.preventDefault();

    if (!image) {
      setIsPhotoValid(false);
      return;
    }

    setIsLoading(true);

    try {
      // Se o plano for pago, verifique o pagamento primeiro
      if (isPaid) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          lineItems: [{ price: 'price_1Q1ylSRraDIE2N6q1CPEIbBT', quantity: 1 }],
          mode: 'payment',
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        });

        if (error) {
          console.error('Stripe Error:', error);
          setIsLoading(false);
          return; // Não continue se houve um erro
        }

        // Aqui você deve verificar se o pagamento foi aprovado
        // Para fins de exemplo, vamos simular que o pagamento foi aprovado
        const paymentApproved = true; // Substitua por lógica real de verificação

        if (!paymentApproved) {
          setIsLoading(false);
          return; // Se o pagamento não foi aprovado, não envie o formulário
        }
      }

      // Processa o envio para EmailJS
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const hot = isPaid ? 1 : 0; // Se o pagamento foi realizado, hot é 1, senão é 0

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
        features,
        livePreview,
        buyLink,
        contactLink,
        imageURL: imageUrl,
        hot, // Adiciona o hot aqui
      };

      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
      setShowModal(false);
      setShowSuccessModal(true);
      resetForm();
      setReset(true);
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsLoading(false);
    }
  };




  const resetForm = () => {
    setMyName('');
    setEmail('');
    setProfileLink('');
    setSiteName('');
    setDescription('');
    setCategory('');
    setTool('');
    setImage(null);
    setPrice('500');
    setLivePreview('');
    setBuyLink('');
    setContactLink('');
    setFeatures([]);
    setIsPhotoValid(true);
    setStep(1);
    sessionStorage.clear();
  };

  const renderStepProgress = () => (
    <div className="step-progress">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className={`step ${index < step ? 'completed' : ''}`} />
      ))}
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );

  const renderStep = () => (
    <form>
      {(() => {
        switch (step) {
          case 1:
            return (
              <YourInfoStep
                myName={myName}
                setMyName={setMyName}
                email={email}
                setEmail={setEmail}
                profileLink={profileLink}
                setProfileLink={setProfileLink}
                siteName={siteName}
                setSiteName={setSiteName}
                description={description}
                setDescription={setDescription}
                livePreview={livePreview}
                setLivePreview={setLivePreview}
                buyLink={buyLink}
                setBuyLink={setBuyLink}
                contactLink={contactLink}
                setContactLink={setContactLink}
                price={price}
                setPrice={setPrice}
                reset={reset}
                setStep={debouncedSetStep}
              />
            );
          case 2:
            return <CategoryStep
              category={category}
              setCategory={setCategory}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 3:
            return <ToolStep
              tool={tool}
              setTool={setTool}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 4:
            return <ImageStep
              image={image}
              setImage={setImage}
              isPhotoValid={isPhotoValid}
              setIsPhotoValid={setIsPhotoValid}
              imageRef={imageRef}
              handleImageChange={handleImageChange}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 5:
            return <FeaturesStep
              features={features}
              setFeatures={setFeatures}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 6:
            return <SiteLinksStep

              selectedPlan={price}
              setStep={debouncedSetStep}
              reset={reset}
              handleSubmit={handleSubmit} />;
          default:
            return null;
        }
      })()}
    </form>
  );

  const stepContent = {
    1: {
      span: t('create.steps.1.span'),
      h1: t('create.steps.1.title'),
      p: t('create.steps.1.description'),
    },
    2: {
      span: t('create.steps.2.span'),
      h1: t('create.steps.2.title'),
      p: t('create.steps.2.description'),
    },
    3: {
      span: t('create.steps.3.span'),
      h1: t('create.steps.3.title'),
      p: t('create.steps.3.description'),
    },
    4: {
      span: t('create.steps.4.span'),
      h1: t('create.steps.4.title'),
      p: t('create.steps.4.description'),
      v: t('create.steps.4.size'),
      c: t('create.steps.4.maxSize'),
    },
    5: {
      span: t('create.steps.5.span'),
      h1: t('create.steps.5.title'),
      p: t('create.steps.5.description'),
    },
    6: {
      span: t('create.steps.6.span'),
      h1: t('create.steps.6.title'),
      p: t('create.steps.6.description'),
    },
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('helmet.publish')}</title>
      </Helmet>

      <div id="create">
        <div className="head-container">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
          >
            <span>{t('create.header.span')}</span>
            <h1>{t('create.header.title')}</h1>
            <p>{t('create.header.description')}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className='price-wrapper'
        >
          <Price setPlan={setPrice} onClick={() => setShowModal(true)} />
        </motion.div>

        <AnimatePresence mode='wait'>
          {showModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="form-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button className="close-button" onClick={() => setShowModal(false)}>
                  <IoCloseOutline size={35} />
                </button>

                <AnimatePresence mode='wait'>
                  <motion.section
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                    className='animate-render-step-wrapper'
                  >
                    <div className="form-wrapper">
                      <div className="left-content">
                        <BiLastPage />
                        <div className="step-info">
                          <span>{stepContent[step].span}</span>
                          <h1>{stepContent[step].h1}</h1>
                          <p>{stepContent[step].p}</p>
                          {step === 4 && (
                            <p className='other-p'>
                              <div className="border"></div>
                              {stepContent[step].v}
                            </p>
                          )}
                          {step === 3 && (
                            <p className='other-p'>
                              <div className="border"></div>
                              {stepContent[step].c}
                            </p>
                          )}
                        </div>
                        {renderStepProgress()}
                      </div>

                      <div className="right-content">
                        {renderStep()}
                      </div>
                    </div>
                  </motion.section>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuccessModal && (
            <SuccessModal onClose={() => setShowSuccessModal(false)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const SuccessModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <IoCloseOutline size={32} />
        </button>
        <h3>{t('create.successModal.title')}</h3>
        <p>{t('create.successModal.description')}</p>
        <button className='modal-btn' onClick={onClose}>Ok</button>
      </motion.div>
    </motion.div>
  );
};

export default Create;
