import React, { useState, useRef, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { Helmet } from 'react-helmet';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
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
import DescriptionDetail from './DescriptionDetail/DescriptionDetail';

import HomeFeatures from './SiteFeatures/SiteFeatures';
import FAQs from '../../components/FAQs/FAQs';
import SiteFeatures from './SiteFeatures/SiteFeatures';


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
  const [descriptionDetail, setDescriptionDetail] = useState('');
  const [category, setCategory] = useState('');
  const [tool, setTool] = useState('');
  const [images, setImages] = useState(() => {
    const storedImages = sessionStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : [null, null, null];
  });
  const [price, setPrice] = useState('0');
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
    debounce((newStep) => setStep(newStep), 100),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Validando o envio do formulário');
    setIsLoading(true);

    try {

      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink,
        email,
        category,
        tool,
        siteName,
        description,
        descriptionDetail,
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
      sessionStorage.clear()
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
    setPrice('0');
    setLivePreview('');
    setBuyLink('');
    setContactLink('');
    setFeatures([]);
    setIsPhotoValid(true);
    setStep(1);
  };

  /* progress line */
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
            return <DescriptionDetail
              descriptionDetail={descriptionDetail}
              setDescriptionDetail={setDescriptionDetail}
              setStep={setStep} />
          case 3:
            return <CategoryStep
              category={category}
              setCategory={setCategory}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 4:
            return <ToolStep
              tool={tool}
              setTool={setTool}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 5:
            return <ImageStep
              images={images}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 6:
            return <FeaturesStep
              features={features}
              setFeatures={setFeatures}
              reset={reset}
              setStep={debouncedSetStep} />;
          case 7:
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

  /* steps text content */
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

    },
    5: {
      span: t('create.steps.5.span'),
      h1: t('create.steps.5.title'),
      p: t('create.steps.5.description'),
      v: t('create.steps.5.size'),
      c: t('create.steps.5.maxSize'),
    },
    6: {
      span: t('create.steps.6.span'),
      h1: t('create.steps.6.title'),
      p: t('create.steps.6.description'),
    },
    7: {
      span: t('create.steps.7.span'),
      h1: t('create.steps.7.title'),
      p: t('create.steps.7.description'),
    },
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('helmet.publish')}</title>
      </Helmet>

      {/* head */}
      <motion.section id="publish-section"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeIn' }}>

        <div className="head-container">
          <div>
            <span>{t('create.header.span')}</span>
            <h1>{t('create.header.title')}</h1>
            <p>{t('create.header.description')}</p>
            <button onClick={() => setShowModal(true)}>{t("price.publishSite")}</button>
          </div>
        </div>
        <SiteFeatures />
        <FAQs />

        {/* modal */}
        <AnimatePresence >
          {showModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.5 }}
            >

              <motion.div
                className="form-container">
                <motion.div className="form-wrapper"
                  key={step} initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}>
                  {/* header */}
                  <div className="header">
                    <div className="logo">
                      <BiLastPage /> <span>Quimplo</span>
                    </div>
                    <button className="close-button" onClick={() => setShowModal(false)}>
                      <IoCloseOutline />
                    </button>
                  </div>

                  <div className="left-content">
                    <div className="step-info">

                      <span>{stepContent[step].span}</span>
                      <h1>{stepContent[step].h1}</h1>
                      <p>{stepContent[step].p}</p>
                      {step === 5 && (
                        <>
                          <p className='other-p'>
                            <div className="border"></div>
                            {stepContent[step].v}
                          </p>
                          <p className='other-p'>
                            <div className="border"></div>
                            {stepContent[step].c}
                          </p>
                        </>
                      )}

                    </div>

                  </div>

                  <div className="right-content">
                    {renderStep()}
                  </div>
                </motion.div>

                {renderStepProgress()}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


      </motion.section>
    </>
  );
};


export default Create;
