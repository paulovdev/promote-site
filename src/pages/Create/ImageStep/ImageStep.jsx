import React, { useState, useRef, useEffect } from 'react';
import { GoUpload } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/Firebase'; // Ajuste o caminho conforme necessário
import './ImageStep.scss';
import { AnimatePresence, motion } from 'framer-motion';

const ImageStep = ({ setStep }) => {
  const { t } = useTranslation();
  const imageRefs = [useRef(null), useRef(null), useRef(null)];
  const [submitted, setSubmitted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState([false, false, false]);
  const [images, setImages] = useState(() => {
    const storedImages = sessionStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : [null, null, null];
  });
  const [isPhotoValid, setIsPhotoValid] = useState(() => images.map(img => img !== null));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedImages = sessionStorage.getItem('images');
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('images', JSON.stringify(images));
    setIsPhotoValid(images.map(img => img !== null));
  }, [images]);

  const handleClick = (index) => {
    imageRefs[index].current.click();
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
      if (fileSizeMB > 1 || !validTypes.includes(file.type)) {
        setShowErrorModal(true);
        return;
      }

      const newLoading = [...loading];
      newLoading[index] = true;
      setLoading(newLoading);

      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error('Upload failed', error);
          const newLoading = [...loading];
          newLoading[index] = false;
          setLoading(newLoading);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newImages = [...images];
            newImages[index] = downloadURL;
            setImages(newImages);
            const newLoading = [...loading];
            newLoading[index] = false;
            setLoading(newLoading);
          });
        }
      );
    }
  };

  const handleDeleteImage = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteImage = () => {
    const newImages = [...images];
    newImages[deleteIndex] = null;
    setImages(newImages);
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (isPhotoValid.every(valid => valid)) {
      setStep((prev) => prev + 1);
    } else {
      setIsPhotoValid(isPhotoValid.map((valid, idx) => (images[idx] !== null ? true : valid)));
    }
  };

  return (
    <>
      <section id='image-step'>
        <div className='image-select large'>
          <button type='button' className='prf-file' onClick={() => handleClick(0)}>
            {loading[0] ? (
              <div className='loading'></div>
            ) : (
              <>
                <GoUpload />
                <span>{t('imageStep.dragAndDropOrChoose')}</span>
                <p>{t('imageStep.supportedFormats')}</p>
                {images[0] && (
                  <div className='image-preview large-preview'>
                    <img src={images[0]} alt={t('imageStep.imageLoaded')} />
                    <div
                      className='preview-content'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(0);
                      }}
                    >
                      <FaTrash />
                    </div>
                  </div>
                )}
              </>
            )}
          </button>
          <input onChange={(e) => handleImageChange(e, 0)} ref={imageRefs[0]} type='file' hidden />
        </div>

        <div className='image-row'>
          {images.slice(1).map((image, index) => (
            <div key={index + 1} className='image-select small'>
              <button type='button' className='prf-file' onClick={() => handleClick(index + 1)}>
                {loading[index + 1] ? (
                  <div className='loading'></div>
                ) : (
                  <>
                    <GoUpload />
                    <span>{t('imageStep.dragAndDropOrChoose')}</span>
                    <p>{t('imageStep.supportedFormats')}</p>
                    {image && (
                      <div className='image-preview small-preview'>
                        <img src={image} alt={t('imageStep.imageLoaded')} />
                        <div
                          className='preview-content'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(index + 1);
                          }}
                        >
                          <FaTrash />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </button>
              <input onChange={(e) => handleImageChange(e, index + 1)} ref={imageRefs[index + 1]} type='file' hidden />
            </div>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {showDeleteModal && (
            <motion.div
              className="image-modal"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.3 }}
            >
              <div className='image-modal-content'>
                <p>{t('imageStep.confirmDelete')}</p>
                <div className='buttons-image-modal'>
                  <button onClick={confirmDeleteImage} type='button'>{t('imageStep.yes')}</button>
                  <button onClick={() => setShowDeleteModal(false)} type='button'>{t('imageStep.no')}</button>
                </div>
              </div>
            </motion.div>
          )}

          {showErrorModal && (
            <div className='image-modal'>
              <div className='image-modal-content'>
                <p>{t('imageStep.fileError')}</p>
                <button onClick={() => setShowErrorModal(false)} type='button'>{t('imageStep.ok')} </button>

              </div>
            </div>
          )}
        </AnimatePresence>
      </section >

      <div className='step-buttons'>
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className='back-button'>
          {t('imageStep.back')}
        </button>
        <button onClick={handleContinue} type='button'>
          {t('imageStep.continue')}
        </button>
      </div>
    </>
  );
};

export default ImageStep;
