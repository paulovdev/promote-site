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


import "./Create.scss";
import { useNavigate } from 'react-router-dom';


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
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('500');
  const [livePreview, setLivePreview] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [features, setFeatures] = useState([]);
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(() => {
    const savedShowModal = sessionStorage.getItem('showModal');
    return savedShowModal !== null ? JSON.parse(savedShowModal) : false;
  });
  const imageRef = useRef();
  const navigate = useNavigate()

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

  const handleImageChange = async (newImages) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/gif']; // Adicione outros formatos conforme necessário
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

    const validImages = [];

    for (let index = 0; index < newImages.length; index++) {
      const file = newImages[index];
      if (file) {
        if (!validFormats.includes(file.type)) {
          alert(t('imageStep.invalidFormat'));
          return;
        }
        if (file.size > maxSizeInBytes) {
          alert(t('imageStep.fileTooLarge'));
          return;
        }

        // Faz o upload da imagem e obtém a URL
        const imageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        validImages[index] = url;
      }
    }

    setImages(validImages);
    setIsPhotoValid(validImages.map(img => img !== null));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Validando o envio do formulário');
    setIsLoading(true);

    try {
      if (images.length === 0) {
        throw new Error("Nenhuma imagem selecionada.");
      }

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
        imageURL1: images[0],
        imageURL2: images[1],
        imageURL3: images[2],
        hot: 0,
      };

      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
      setShowModal(false);
      resetForm();
      navigate('/success');
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
    setPrice('500');
    setLivePreview('');
    setBuyLink('');
    setContactLink('');
    setFeatures([]);
    setIsPhotoValid(true);
    setStep(1);

  };

  const renderStepProgress = () => (
    <div className="step-progress">
      <div className="progress-line"></div>
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${step * 14.28}%` }} // Ajustado para 7 passos
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
              images={images}
              onImageChange={handleImageChange}
              setImages={setImages}
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
              setStep={debouncedSetStep}
              reset={reset}
              handleSubmit={handleSubmit}
              isPaid={true}
            />
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

      {/* head */}
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

        {/* price */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className='price-wrapper'
        >
          <button onClick={() => setShowModal(true)}>{t("price.publishSite")}</button>
        </motion.div>

        {/* modal */}
        <AnimatePresence mode='wait'>
          {showModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                className="form-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >

                <AnimatePresence mode='wait'>
                  <motion.section
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.1 }}
                    className='animate-render-step-wrapper'
                  >


                    <div className="form-wrapper">
                      <div className="header">
                        <BiLastPage />
                        <button className="close-button" onClick={() => setShowModal(false)}>
                          <IoCloseOutline />
                        </button>

                      </div>
                      <div className="left-content">
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

                      </div>

                      <div className="right-content">
                        {renderStep()}
                      </div>

                    </div>
                    {renderStepProgress()}
                  </motion.section>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </>
  );
};


export default Create;
