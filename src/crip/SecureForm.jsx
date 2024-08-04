import React, { useState, useRef } from 'react';
import { db, storage } from '../firebase/Firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

const SecureForm = () => {
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
  const [sitePrice, setSitePrice] = useState(0);

  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setIsPhotoValid(false);
      return;
    }

    try {
      const imageRef = ref(storage, `images/${siteName}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      setImageURL(downloadURL);

      await addDoc(collection(db, 'sites'), {
        myName,
        email,
        profileLink,
        siteName,
        description,
        category,
        tool,
        price: sitePrice,
        livePreview,
        buyLink,
        contactLink,
        agree,
        imageURL: downloadURL,
        createdAt: serverTimestamp(),
        views: 0,
      });

      alert('Form submitted successfully!');

      setMyName('');
      setEmail('');
      setProfileLink('');
      setSiteName('');
      setDescription('');
      setSitePrice(0);
      setCategory('Blog');
      setTool('');
      setLivePreview('');
      setBuyLink('');
      setContactLink('');
      setAgree(false);
      setImage(null);
      setImageURL('');
      setIsPhotoValid(true);
    } catch (error) {
      console.error('Error adding document: ', error);
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
    <div id='secure-form'>
      <br />
      <br />
      <br />
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <h2>1 - Your info:</h2>
        <div className="grid-1">
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
        </div>

        <h2>2 - Site Info:</h2>
        <div className="grid-1">
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
        <h2>3 - Site Links:</h2>

        <div className="grid-1">
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
        </div>

        <div className="client-text">
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
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecureForm;
