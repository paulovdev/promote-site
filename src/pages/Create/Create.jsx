import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';


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
  const [sitePrice, setSitePrice] = useState(0);
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
        sitePrice: sitePrice === 0 ? 'Free' : `$${sitePrice}`,
        livePreview: livePreview,
        buyLink: buyLink,
        contactLink: contactLink,
        imageURL: downloadURL,
      };

      // Send email
      await emailjs.send('service_rn6tzel', 'template_ash6cza', templateParams, '0j6AC4QElZ7rF8zIB');

      setMyName('');
      setEmail('');
      setProfileLink('');
      setSiteName('');
      setDescription('');
      setCategory('Blog');
      setLivePreview('');
      setBuyLink('');
      setSitePrice(0);
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


      <div className="head-text">
        <h1>Submit your <span>website</span></h1>
      </div>


      <div className="sticky-container">

        <form onSubmit={handleSubmit}>
          <h3>1 - Your info:</h3>


          <div className="border-top-form"></div>
          <div className="input-container">
            <label>Your Name<span>*</span></label>
            <input
              type="text"
              placeholder="Paulo*"
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              required
            />
          </div>
          <div className="border-bottom-form"></div>

          <div className="input-container">
            <label>Profile Link<span>*</span></label>
            <input
              type="text"
              placeholder="https://example.com"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
            />
          </div>
          <div className="border-bottom-form"></div>





          <h3>2 - Site Info:</h3>

          <div className="border-top-form"></div>

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
          
          <div className="border-bottom-form"></div>

          <div className="input-container">
            <label>Pick a Category<span>*</span></label>
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

          <div className="border-bottom-form"></div>

          <div className="input-container">
            <label>Pick a Tool<span>*</span></label>
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

          <div className="border-bottom-form"></div>


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

          <div className="border-bottom-form"></div>

          <div className="input-container">
            <label>Site Price</label>
            <div className="range">
              <input
                type="range"
                id="range1"
                min="0"
                max="300"
                step="5"
                value={sitePrice}
                onChange={(e) => setSitePrice(Number(e.target.value))}
              />
            </div>
            <p>{sitePrice === 0 ? 'Free' : `$${sitePrice}`}</p>
          </div>

          <div className="border-bottom-form"></div>

          <div className="step-image">
            <label>Pick an image<span>*</span></label>
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

          <div className="border-bottom-form"></div>





          <h3>3 - Site Links:</h3>

          <div className="border-top-form"></div>

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

          <div className="border-bottom-form"></div>


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


          <div className="border-bottom-form"></div>

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

          <div className="border-bottom-form"></div>


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
