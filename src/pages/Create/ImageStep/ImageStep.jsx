import React from 'react';
import { GoUpload } from "react-icons/go";
import { motion } from 'framer-motion';

import "./ImageStep.scss";

const ImageStep = ({ image, setImage, isPhotoValid, setIsPhotoValid, imageRef, handleImageChange, setStep }) => {
  const handleClick = () => {
    imageRef.current.click();
  };

  return (
    <section id='image-step'>
      <h3>Select an Image</h3>
      <p>Upload an image that represents your site. This image will be used for previews and listings.</p>
      <div className="step-image">
        <div className="image-select">
          <button type="button" className="prf-file" onClick={handleClick}>
            <GoUpload size={75} />
            <span>Drag and Drop or Choose a Local File </span>
            <p>Supported formats: .png, .jpg, .svg </p>
            <p>{image ? 'Image loaded...' : ''}</p>
          </button>
          {image && (
            <img
              width={150}
              src={URL.createObjectURL(image)}
              alt="Image loaded"
              className="preview-image"
            />
          )}
        </div>
        <input
          onChange={handleImageChange}
          ref={imageRef}
          type="file"
          hidden
        />
        {!isPhotoValid && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Image required*
          </motion.p>
        )}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default ImageStep;
