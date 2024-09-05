import React, { useState } from 'react';
import { GoUpload } from "react-icons/go";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import "./ImageStep.scss";

const ImageStep = ({ image, setImage, isPhotoValid, setIsPhotoValid, imageRef, handleImageChange, setStep }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (isPhotoValid) {
      setStep((prev) => prev + 1);
    } else {
      setIsPhotoValid(false);
    }
  };

  return (
    <section id='image-step'>

      <div className="step-image">
        <div className="image-select">
          <button type="button" className="prf-file" onClick={handleClick}>
            <GoUpload size={75} />
            <span>{t('imageStep.dragAndDropOrChoose')}</span>
            <p>{t('imageStep.supportedFormats')}</p>

            <p>{image ? t('imageStep.imageLoaded') : ''}</p>
          </button>
          {image && (
            <img
              width={150}
              src={URL.createObjectURL(image)}
              alt={t('imageStep.imageLoaded')}
              className="preview-image"
            />
          )}
        </div>
        <input
          onChange={(e) => {
            handleImageChange(e);
            setIsPhotoValid(e.target.files.length > 0);
          }}
          ref={imageRef}
          type="file"
          hidden
        />
        {submitted && !isPhotoValid && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="error-message"
          >
            {t('imageStep.imageRequired')}
          </motion.p>
        )}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">{t('imageStep.back')}</button>
        <button onClick={handleContinue} type='button'>{t('imageStep.continue')}</button>
      </div>
    </section>
  );
};

export default ImageStep;
