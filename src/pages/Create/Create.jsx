import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MdOutlineCloudUpload } from "react-icons/md";

import { IoCloseOutline } from 'react-icons/io5';

import { storage } from '../../firebase/Firebase';
import YourInfoStep from './YourInfoStep/YourInfoStep';
import CategoryStep from './CategoryStep/CategoryStep';
import ToolStep from './ToolStep/ToolStep';
import ImageStep from './ImageStep/ImageStep';
import PriceStep from './PriceStep/PriceStep';
import SiteLinksStep from './SiteLinksStep/SiteLinksStep';

import "./Create.scss"

const Create = () => {
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
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const imageRef = useRef();

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
      // Upload image to Firebase
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Prepare email parameters
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
        livePreview: livePreview,
        buyLink: buyLink,
        contactLink: contactLink,
        imageURL: imageUrl,  // Set the image URL here
      };

      // Send email
      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');

      // Handle successful submission
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const renderStepProgress = () => {
    return (
      <div className="step-progress">
        <div className="progress-line"></div>
        <motion.div
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${step * 14.5}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    );
  };

  const renderStep = () => {
    return (
      <AnimatePresence mode='wait'>
        <motion.section
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          className='animate-render-step-wrapper'
        >
          {(() => {
            switch (step) {
              case 1:
                return <YourInfoStep myName={myName} setMyName={setMyName} email={email} setEmail={setEmail} profileLink={profileLink} setProfileLink={setProfileLink} siteName={siteName} setSiteName={setSiteName} description={description} setDescription={setDescription} setStep={setStep} />;
              case 2:
                return <CategoryStep category={category} setCategory={setCategory} setStep={setStep} />;
              case 3:
                return <ToolStep tool={tool} setTool={setTool} setStep={setStep} />;
              case 4:
                return <ImageStep image={image} setImage={setImage} isPhotoValid={isPhotoValid} setIsPhotoValid={setIsPhotoValid} imageRef={imageRef} handleImageChange={handleImageChange} setStep={setStep} />;
              case 5:
                return <PriceStep price={price} setPrice={setPrice} setStep={setStep} />;
              case 6:
                return <SiteLinksStep livePreview={livePreview} setLivePreview={setLivePreview} buyLink={buyLink} setBuyLink={setBuyLink} contactLink={contactLink} setContactLink={setContactLink} setStep={setStep} handleSubmit={handleSubmit} />;
              default:
                return null;

            }
          })()}
        </motion.section>
      </AnimatePresence>
    );
  };

  return (
    <>
      <div id="create">
        <div className="head-container">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
          >
            <div className="head">
              <span><MdOutlineCloudUpload />Submit Your Website to Us</span>
              <h1>Ready to Showcase Your Website and Reach More Visitors?</h1>
              <p>
                Take this opportunity to present your website on our platform. By submitting, you can connect with a larger audience and even sell your site to interested buyers. Click below to get started and maximize your online presence.
              </p>
              <motion.button whileHover={{ scale: 1.05, }} transition={{ type: "spring", stiffness: 550, damping: 3 }} onClick={() => setShowModal(true)}>Submit</motion.button >
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.5 }}
          >
            {/*  <div className="sub-head">
              <span>Want to Bypass the Waiting List?</span>
              <h1>We’re experiencing high traffic and have a waiting list for new submissions.</h1>
              <p>
                Normally, your site will be reviewed and added within 1-2 weeks. To speed up the process and get your site live sooner, consider subscribing to Quimplo Premium or use the option below to skip the line.
              </p>
              <Link to="/create">
                <motion.button whileHover={{ scale: 1.05, }} transition={{ type: "spring", stiffness: 550, damping: 3 }}>Skip the Line</motion.button>
              </Link>
            </div> */}
          </motion.div>
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              className="step-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {renderStepProgress()}
              <div className="border-dotted"></div>
              {renderStep()}

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

    </>
  );
};

export default Create;

const LoadingSpinner = () => (
  <div className="spinner"></div>
);

const SuccessModal = ({ onClose }) => (
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
      <h3>Form submitted successfully!</h3>
      <p>Please note that it may take 1 to 2 weeks for us to review your submission.</p>
    </motion.div>
  </motion.div>
);
