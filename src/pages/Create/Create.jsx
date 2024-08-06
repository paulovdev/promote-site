import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { GoUpload } from "react-icons/go";

import { storage } from '../../firebase/Firebase';
import "./Create.scss";
import { Link } from 'react-router-dom';

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [step, setStep] = useState(1);

  const [myName, setMyName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [siteName, setSiteName] = useState('');
  const [description, setDescription] = useState('');
  const [sitePrice, setSitePrice] = useState(0);
  const [category, setCategory] = useState('');
  const [tool, setTool] = useState('');
  const [livePreview, setLivePreview] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [agree, setAgree] = useState(false);
  const [image, setImage] = useState(null);
  const [isPhotoValid, setIsPhotoValid] = useState(true);

  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setIsPhotoValid(false);
      return;
    }

    try {
      setIsLoading(true);
      const imageRef = ref(storage, `images/${siteName}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);

      // Prepare templateParams
      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink: profileLink,
        email: email,
        category: category,
        tool: tool,
        siteName: siteName,
        description: description,
        sitePrice: sitePrice === 0 ? 'Free' : `$${sitePrice}`,
        livePreview: livePreview,
        buyLink: buyLink,
        contactLink: contactLink,
        imageURL: downloadURL,
      };

      // Send email
      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');

      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending email: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setIsPhotoValid(true);
    }
  };

  const handleClick = () => {
    imageRef.current.click();
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
                return (
                  <section
                    id="your-info-step">
                    <h3>Your info</h3>
                    <p>Provide your name, email, and profile link to get started.</p>

                    <div className="input-container">
                      <label>Your name<span>*</span></label>
                      <input
                        type="text"
                        placeholder="Paulo*"
                        value={myName}
                        onChange={(e) => setMyName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-container">
                      <label>Your e-mail<span>*</span></label>
                      <input
                        type="text"
                        placeholder="paulo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="input-container">
                      <label>Profile link<span>*</span></label>
                      <input
                        type="text"
                        placeholder="https://example.com"
                        value={profileLink}
                        onChange={(e) => setProfileLink(e.target.value)}
                      />
                    </div>


                    <div className="step-buttons">
                      <button disabled onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 2:
                return (
                  <section
                    id="site-info-step">
                    <h3>Site Info</h3>
                    <p>Enter the name and description of your site. This helps users understand what your site is about.</p>
                    <div className="input-container ">
                      <label>Site Name<span>*</span></label>
                      <input
                        type="text"
                        placeholder="Example Name"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        required
                      />

                    </div>
                    <div className="input-container text-input">
                      <label>Description<span>*</span></label>
                      <textarea
                        type="text"
                        placeholder="This website contains..."
                        value={description}
                        maxLength={250}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      {description && (
                        <span onClick={() => clearInput("description")}>
                          <IoCloseOutline size={24} />
                        </span>
                      )}
                    </div>
                    <div className="step-buttons">
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 3:
                return (
                  <section id='category-step'>
                    <h3>Select Category</h3>
                    <p>Choose the category that best fits your site. This helps in organizing and finding your site.</p>
                    <div className="category-cards">
                      <div
                        onClick={() => setCategory('blog')}
                        className={category === 'blog' ? 'selected' : 'category-card'}
                      >
                        Blog
                      </div>
                      <div
                        onClick={() => setCategory('business')}
                        className={category === 'business' ? 'selected' : 'category-card'}
                      >
                        Business
                      </div>
                      <div
                        onClick={() => setCategory('creative')}
                        className={category === 'creative' ? 'selected' : 'category-card'}
                      >
                        Creative
                      </div>
                      <div
                        onClick={() => setCategory('educational')}
                        className={category === 'educational' ? 'selected' : 'category-card'}
                      >
                        Educational
                      </div>
                      <div
                        onClick={() => setCategory('e-commerce')}
                        className={category === 'e-commerce' ? 'selected' : 'category-card'}
                      >
                        E-commerce
                      </div>
                      <div
                        onClick={() => setCategory('event')}
                        className={category === 'event' ? 'selected' : 'category-card'}
                      >
                        Event
                      </div>
                      <div
                        onClick={() => setCategory('health-wellness')}
                        className={category === 'health-wellness' ? 'selected' : 'category-card'}
                      >
                        Health & Wellness
                      </div>
                      <div
                        onClick={() => setCategory('landing-page')}
                        className={category === 'landing-page' ? 'selected' : 'category-card'}
                      >
                        Landing Page
                      </div>
                      <div
                        onClick={() => setCategory('non-profit')}
                        className={category === 'non-profit' ? 'selected' : 'category-card'}
                      >
                        Non-Profit
                      </div>
                      <div
                        onClick={() => setCategory('photography')}
                        className={category === 'photography' ? 'selected' : 'category-card'}
                      >
                        Photography
                      </div>
                      <div
                        onClick={() => setCategory('portfolio')}
                        className={category === 'portfolio' ? 'selected' : 'category-card'}
                      >
                        Portfolio
                      </div>
                      <div
                        onClick={() => setCategory('restaurant')}
                        className={category === 'restaurant' ? 'selected' : 'category-card'}
                      >
                        Restaurant
                      </div>
                      <div
                        onClick={() => setCategory('saas')}
                        className={category === 'saas' ? 'selected' : 'category-card'}
                      >
                        SaaS
                      </div>
                      <div
                        onClick={() => setCategory('technology')}
                        className={category === 'technology' ? 'selected' : 'category-card'}
                      >
                        Technology
                      </div>
                      <div
                        onClick={() => setCategory('travel')}
                        className={category === 'travel' ? 'selected' : 'category-card'}
                      >
                        Travel
                      </div>
                    </div>


                    <div className="step-buttons">
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 4:
                return (
                  <section id='tool-step'>
                    <h3>Select Tool</h3>
                    <p>Select the tool or platform you used to create your site. This will help users understand the technologies involved.</p>
                    <div className="tool-cards">
                      <div
                        onClick={() => setTool('drupal')}
                        className={tool === 'drupal' ? 'selected' : 'tool-card'}
                      >
                        <FaDrupal />

                      </div>
                      <div
                        onClick={() => setTool('elementor')}
                        className={tool === 'elementor' ? 'selected' : 'tool-card'}
                      >
                        <FaElementor />

                      </div>
                      <div
                        onClick={() => setTool('framer')}
                        className={tool === 'framer' ? 'selected' : 'tool-card'}
                      >
                        <SiFramer />

                      </div>
                      <div
                        onClick={() => setTool('ghost')}
                        className={tool === 'ghost' ? 'selected' : 'tool-card'}
                      >
                        <SiGhost />

                      </div>
                      <div
                        onClick={() => setTool('html-css-js')}
                        className={tool === 'html-css-js' ? 'selected' : 'tool-card'}
                      >
                        <FaHtml5 />

                      </div>
                      <div
                        onClick={() => setTool('next')}
                        className={tool === 'next' ? 'selected' : 'tool-card'}
                      >
                        <SiNextdotjs />

                      </div>
                      <div
                        onClick={() => setTool('react')}
                        className={tool === 'react' ? 'selected' : 'tool-card'}
                      >
                        <FaReact />

                      </div>
                      <div
                        onClick={() => setTool('webflow')}
                        className={tool === 'webflow' ? 'selected' : 'tool-card'}
                      >
                        <SiWebflow />

                      </div>
                      <div
                        onClick={() => setTool('wix')}
                        className={tool === 'wix' ? 'selected' : 'tool-card'}
                      >
                        <SiWix />

                      </div>
                      <div
                        onClick={() => setTool('wordpress')}
                        className={tool === 'wordpress' ? 'selected' : 'tool-card'}
                      >
                        <FaWordpress />

                      </div>
                    </div>
                    <div className="step-buttons">
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 5:
                return (
                  <section id='image-step'>
                    <h3>Select an Image</h3>
                    <p>Upload an image that represents your site. This image will be used for previews and listings.</p>
                    <div className="step-image">
                      <div className="image-select">
                        <button
                          type="button"
                          className="prf-file"
                          onClick={handleClick}
                        >
                          <GoUpload size={75} />
                          <span>Drag and Drop or Choose a Local File </span>
                          <p>Supported formats: .png, .jpg, .svg </p>
                          <p>{image ? 'Image loaded...' : ''}</p>
                        </button>
                        {image && (
                          <>
                            <img
                              width={150}
                              src={URL.createObjectURL(image)}
                              alt="Image loaded"
                              className="preview-image"
                            />
                          </>)}
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
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 6:
                return (
                  <section id='price-step'>
                    <h3>Set a Price</h3>
                    <p>Set a price for your site. You can choose to offer it for free or set a specific price.</p>

                    <input
                      type="range"
                      min="0"
                      max="300"
                      step="5"
                      value={sitePrice}
                      onChange={(e) => setSitePrice(Number(e.target.value))}
                    />
                    <p className='price-text'>{sitePrice === 0 ? 'Free' : `$${sitePrice}`}</p>
                    <div className="step-buttons">
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 7:
                return (
                  <section id='site-links-step'>
                    <h3>Site Links</h3>
                    <p>Provide the links where users can preview, buy, or contact you about your site.</p>
                    <div className="input-container">
                      <label>Live Preview Link<span>*</span></label>
                      <input
                        type="text"
                        placeholder="https://preview-link.com"
                        value={livePreview}
                        onChange={(e) => setLivePreview(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-container">
                      <label>Buy Link<span>*</span></label>
                      <input
                        type="text"
                        placeholder="https://buy-link.com"
                        value={buyLink}
                        onChange={(e) => setBuyLink(e.target.value)}
                        required
                      />
                    </div>


                    <div className="input-container">
                      <label>Contact Link<span>*</span></label>
                      <input
                        type="text"
                        placeholder="https://link-to-contact.com"
                        value={contactLink}
                        onChange={(e) => setContactLink(e.target.value)}
                        required
                      />
                    </div>


                    <div className="step-buttons">
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={() => setStep(step + 1)}>Continue</button>
                    </div>
                  </section>
                );
              case 8:
                return (
                  <section id='terms-step'>
                    <h3>Terms and Conditions</h3>
                    <p>Please read and agree to the terms and conditions before submitting. Your submission indicates acceptance of these terms.</p>
                    <div className="terms-container">
                      <label>I agree to the terms and conditions</label>
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        required
                      />
                    </div>
                    <div className="step-buttons">
                      <button onClick={() => setStep(step - 1)} className="back-button">Back</button>
                      <button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? <LoadingSpinner /> : 'Submit'}
                      </button>
                    </div>
                  </section>
                );
              default:
                return null;
            }
          })()}
        </motion.section>
      </AnimatePresence>
    );
  };


  const renderStepProgress = () => {
    const steps = [
      { id: 1, name: 'Your info' },
      { id: 2, name: 'Site info' },
      { id: 3, name: 'Site Category' },
      { id: 4, name: 'Site Tool' },
      { id: 5, name: 'Site Image' },
      { id: 6, name: 'Site price' },
      { id: 7, name: 'Site links' },
      { id: 8, name: 'Finish' }
    ];

    return steps.map((stepObj) => (
      <div key={stepObj.id} className="step-wrapper" >
        <div className={`step-item ${step >= stepObj.id ? 'active' : ''}`} onClick={() => setStep(stepObj.id)}>
          {stepObj.id}
        </div>
        <div className="step-name">
          {stepObj.name}
        </div>
      </div>
    ));
  };




  return (
    <div id='create'>
      <div className="head">
        <h1>Submit your site</h1>
        <button onClick={() => setShowModal(true)}>Submit</button>
      </div>

      <div className='sub-head'>
        <h2>Want to skip the waiting line?</h2>
        <p>With the recent increase in traffic and model submissions, we now have a waiting list. Currently, you can expect your template to be added within 5-7 weeks of submission. If you want your model added early or on a specific date, you can skip the waiting line by subscribing to Quimplo Premium or by clicking the button below.</p>
        <Link to='/create'>
          <button>Skip the Line</button>
        </Link>
      </div>


      <AnimatePresence>
        {showModal && (
          <motion.div
            className="step-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="step-container">
              <div className="step-progress">
                {renderStepProgress()}
              </div>
              {renderStep()}
            </div>
            <button className="close-button" onClick={() => setShowModal(false)}>
              <IoCloseOutline size={35} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

    </div>
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
      <button className="close-btn" onClick={onClose}><IoCloseOutline size={32} /></button>
      <h3>Form submitted successfully!</h3>
      <p>Please note that it may take 5 to 7 weeks for us to review your submission.</p>
    </motion.div>
  </motion.div>
);