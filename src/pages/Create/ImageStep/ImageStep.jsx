import React, { useState, useRef } from 'react';
import { GoUpload } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import "./ImageStep.scss";
import { FaTrash } from 'react-icons/fa';

const ImageUploadComponent = ({ setStep, onImageChange }) => {
  const { t } = useTranslation();
  const imageRefs = [useRef(null), useRef(null), useRef(null)];
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState([null, null, null]);
  const [isPhotoValid, setIsPhotoValid] = useState([false, false, false]);

  const handleClick = (index) => {
    imageRefs[index].current.click();
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
      setIsPhotoValid(newImages.map(img => img !== null));

      // Chama a função onImageChange com a lista de arquivos
      onImageChange(newImages);
    }
    console.log("file:", file);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    setIsPhotoValid(newImages.map(img => img !== null));
    // Chama a função onImageChange com a lista de arquivos
    onImageChange(newImages);
    console.log("newimage:", newImages);
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (isPhotoValid.every(valid => valid)) {
      setStep((prev) => prev + 1);
    } else {
      setIsPhotoValid(isPhotoValid.map(valid => valid ? true : false));
    }
  };

  return (
    <>
      <section id='image-step'>
        <div className="image-select">
          <button type="button" className="prf-file" onClick={() => handleClick(0)}>
            <GoUpload />
            <span>{t('imageStep.dragAndDropOrChoose')}</span>
            <p>{t('imageStep.supportedFormats')}</p>
            {images[0] && (
              <>
                <div className='image-preview large-preview'>
                  <img
                    src={URL.createObjectURL(images[0])}
                    alt={t('imageStep.imageLoaded')}
                  />
                </div>
                <div className="preview-content" onClick={() => handleDeleteImage(0)}>
                  <FaTrash />
                  <p>{images[0] ? 'Deletar imagem' : ''}</p>
                </div>
              </>
            )}
          </button>
          <input
            onChange={(e) => handleImageChange(e, 0)}
            ref={imageRefs[0]}
            type="file"
            hidden
          />
        </div>

        <div className="image-row">
          {images.slice(1).map((image, index) => (
            <div key={index + 1} className="image-select">
              <button type="button" className="prf-file" onClick={() => handleClick(index + 1)}>
                <GoUpload />
                <span>{t('imageStep.dragAndDropOrChoose')}</span>
                <p>{t('imageStep.supportedFormats')}</p>
                {image && (
                  <>
                    <div className='image-preview'>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={t('imageStep.imageLoaded')}
                      />
                    </div>
                    <div className="preview-content" onClick={() => handleDeleteImage(index + 1)}>
                      <FaTrash />
                      <p>{image ? 'Deletar imagem' : ''}</p>
                    </div>
                  </>
                )}
              </button>
              <input
                onChange={(e) => handleImageChange(e, index + 1)}
                ref={imageRefs[index + 1]}
                type="file"
                hidden
              />
            </div>
          ))}
        </div>
      </section>
      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">
          {t('imageStep.back')}
        </button>
        <button onClick={handleContinue} type='button'>
          {t('imageStep.continue')}
        </button>
      </div>
    </>
  );

};

export default ImageUploadComponent;
