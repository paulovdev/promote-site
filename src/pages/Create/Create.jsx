import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Firebase';
import "./Create.scss";
import { Link } from 'react-router-dom';

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [myName, setMyName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [siteName, setSiteName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tool, setTool] = useState('');
  const [livePreview, setLivePreview] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [agree, setAgree] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
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
      setImageURL(downloadURL);

      // Prepare templateParams
      const templateParams = {
        from_name: myName,
        to_name: 'Paulo Vitor',
        profileLink: profileLink,
        category: category,
        tool: tool,
        siteName: siteName,
        description: description,
        livePreview: livePreview,
        buyLink: buyLink,
        contactLink: contactLink,
        imageURL: downloadURL,
      };

      // Send email
      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');

      // Reset form fields
      setMyName('');
      setEmail('');
      setProfileLink('');
      setSiteName('');
      setDescription('');
      setCategory('Blog');
      setLivePreview('');
      setBuyLink('');
      setAgree(false);
      setImage(null);
      setImageURL('');
      setIsPhotoValid(true);

      setShowModal(true);
    } catch (error) {
      console.error('Error sending email: ', error);
    } finally {
      setIsLoading(false); // Stop loading spinner
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

  const clearInput = (input) => {
    switch (input) {
      case "description":
        setDescription("");
        break;
      default:
        break;
    }
  };

  return (
    <div id='create'>
      <h1>Submit your website for promotion</h1>
      <p>Submit your Framer template for free below to share it with the Frameplate community. It'll be added to the Frameplate website and posted on our Twitter account.
        We're only adding one website template per weekday to Frameplate as we want each template to get all the visibility it deserves.</p>
      <div className="sticky-container">

        <form onSubmit={handleSubmit}>
          <h3>1 - Your info:</h3>

          <div className="input-container">
            <input
              type="text"
              placeholder=""
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              required
            />
            <label>Your Name</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder=""
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
            />
            <label>Profile Link</label>
          </div>


          <h3>2 - Site Info:</h3>

          <div className="input-container">
            <input
              type="text"
              placeholder=""
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />
            <label>Site Name</label>
          </div>
          <div className="step-category">
            <div className="input-container">
              <label>Pick a Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select</option>
                <option value="blog">Blog</option>
                <option value="business">Business</option>
                <option value="creative">Creative</option>
                <option value="educational">Educational</option>
                <option value="e-commerce">E-commerce</option>
                <option value="event">Event</option>
                <option value="health-wellness">Health & Wellness</option>
                <option value="landing-page">Landing Page</option>
                <option value="non-profit">Non-Profit</option>
                <option value="photography">Photography</option>
                <option value="portfolio">Portfolio</option>
                <option value="restaurant">Restaurant</option>
                <option value="saas">Saas</option>
                <option value="technology">Technology</option>
                <option value="travel">Travel</option>
              </select>
            </div>
          </div>

          <div className="step-category">
            <div className="input-container">
              <label>Pick a Tool</label>
              <select
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                required
              >
                <option value="" disabled>Select</option>
                <option value="drupal">Drupal</option>
                <option value="elementor">Elementor</option>
                <option value="framer">Framer</option>
                <option value="ghost">Ghost</option>
                <option value="html-css-js">HTML + CSS + JS</option>
                <option value="next">Next</option>
                <option value="react">React</option>
                <option value="webflow">Webflow</option>
                <option value="wix">Wix</option>
                <option value="wordpress">WordPress</option>
              </select>
            </div>
          </div>


          <div className="input-container text-input">
            <textarea
              type="text"
              placeholder=""
              value={description}
              maxLength={250}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
            {description && (
              <span onClick={() => clearInput("description")}>
                <IoCloseOutline size={24} />
              </span>
            )}
          </div>
          <div className="step-image">
            <label>Pick an image</label>
            <div className="image-select">
              <button
                type="button"
                className="prf-file"
                onClick={handleClick}
              >
                <IoImageOutline size={75} />
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
          <h3>3 - Site Links:</h3>


          <div className="input-container">
            <input
              type="text"
              placeholder=""
              value={livePreview}
              onChange={(e) => setLivePreview(e.target.value)}
              required
            />
            <label>Live Preview Link</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder=""
              value={buyLink}
              onChange={(e) => setBuyLink(e.target.value)}
              required
            />
            <label>Buy Link</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder=""
              value={contactLink}
              onChange={(e) => setContactLink(e.target.value)}
              required
            />
            <label>Contact Link</label>
          </div>


          <div className="cient-text">
            <p>By ticking this box you agree to receive communications from SitePromote.</p>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
          </div>

          <div className="buttons-register-wrapper">
            <div className="button-register-wrapper">
              <button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : 'Submit'}
              </button>
            </div>
          </div>
        </form>

        <div className="right-content">
          <h2>Want to skip the waiting line?</h2>
          <p>With the recent increase in traffic and model submissions, we now have a waiting list.
            Currently, you can expect your template to be added within 5-7 weeks of submission. If you want your model added early or on a specific date, you can pay to skip the queue, and you'll have it on the site's main slider and in the hot category (this will also help keep this site running).</p>
          <Link
            to="/sites/blog"
            className="sticky-right-content-button"
          >
            Take me where I do this
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {showModal && <Modal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="spinner"></div>
);

const Modal = ({ onClose }) => (
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
      <button className="close-button" onClick={onClose}><IoCloseOutline size={32} /></button>
      <h3>Form submitted successfully!</h3>
      <p>Please note that it may take 5 to 7 weeks for us to review your submission.</p>
    </motion.div>
  </motion.div>
);

export default Create;
