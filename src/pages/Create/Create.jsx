import React, { useState, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Firebase';
import { IoCloseOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from 'react-i18next';

import YourInfoStep from './YourInfoStep/YourInfoStep';
import CategoryStep from './CategoryStep/CategoryStep';
import ToolStep from './ToolStep/ToolStep';
import ImageStep from './ImageStep/ImageStep';
import PriceStep from './PriceStep/PriceStep';
import SiteLinksStep from './SiteLinksStep/SiteLinksStep';
import FeaturesStep from './FeaturesStep/FeaturesStep'; // Novo componente

import Price from '../../components/Price/Price';
import { Link } from 'react-router-dom';

import "./Create.scss";

const Create = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
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
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const imageRef = useRef();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setIsPhotoValid(false);
      return;
    }

    setIsLoading(true);

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink: profileLink,
        email: email,
        category: category,
        tool: tool,
        siteName: siteName,
        description: description,
        sitePrice: price === 0 ? 'Free' : `$${price}`,
        features: features,
        livePreview: livePreview,
        buyLink: buyLink,
        contactLink: contactLink,
        imageURL: imageUrl,
      };

      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsLoading(false);
    }
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
            return <YourInfoStep myName={myName} setMyName={setMyName} email={email} setEmail={setEmail} profileLink={profileLink} setProfileLink={setProfileLink} siteName={siteName} setSiteName={setSiteName} description={description} setDescription={setDescription} setStep={debouncedSetStep} livePreview={livePreview} setLivePreview={setLivePreview} buyLink={buyLink} setBuyLink={setBuyLink} contactLink={contactLink} setContactLink={setContactLink} />;
          case 2:
            return <CategoryStep category={category} setCategory={setCategory} setStep={debouncedSetStep} />;
          case 3:
            return <ToolStep tool={tool} setTool={setTool} setStep={debouncedSetStep} />;
          case 4:
            return <ImageStep image={image} setImage={setImage} isPhotoValid={isPhotoValid} setIsPhotoValid={setIsPhotoValid} imageRef={imageRef} handleImageChange={handleImageChange} setStep={debouncedSetStep} />;
          case 5:
            return <FeaturesStep features={features} setFeatures={setFeatures} setStep={debouncedSetStep} />; // Novo case para Features
          case 6:
            return <PriceStep price={price} setPrice={setPrice} setStep={debouncedSetStep} />;
          case 7:
            return <SiteLinksStep setStep={debouncedSetStep} handleSubmit={handleSubmit} />;
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
    7: {
      span: t('create.steps.7.span'),
      h1: t('create.steps.7.title'),
      p: t('create.steps.7.description'),
    },
  };

  return (
    <div id="create">
      <div className="head-container">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <h1>{t('create.header.title')}</h1>
          <p>
            {t('create.header.description')}
          </p>


        </motion.div>

      </div>
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeIn' }}
        className='price-wrapper'
      >
        <Price onClick={() => setShowModal(true)} />
      </motion.div>
      <AnimatePresence mode='wait'>
        {showModal && (
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
                transition={{ ease: 'easeInOut', duration: 0.3 }}
                className='animate-render-step-wrapper'
              >
                <div className="form-wrapper">
                  <div className="left-content">
                    <div className="step-info">
                      <span>{stepContent[step].span} </span>
                      <h1>{stepContent[step].h1} </h1>
                      <p>{stepContent[step].p}</p>
                      {step == 4 && (
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
                    {renderStepProgress()}
                  </div>

                  <div className="right-content">
                    {renderStep()}
                  </div>
                </div>
              </motion.section>
            </AnimatePresence>

            <button className="close-button" onClick={() => setShowModal(false)}>
              <IoCloseOutline size={35} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </AnimatePresence>
    </div>
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
      </motion.div>
    </motion.div>
  );
};

export default Create;
