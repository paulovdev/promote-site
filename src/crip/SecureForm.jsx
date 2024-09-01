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
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [features, setFeatures] = useState([]);
  const [sitePrice, setSitePrice] = useState(0);

  const imageRef = useRef();

  const featuresList = [
    { id: 1, name: 'Responsivo' },
    { id: 2, name: 'SEO Otimizado' },
    { id: 3, name: 'Integração com Redes Sociais' },
    { id: 4, name: 'Carregamento Rápido' },
    { id: 5, name: 'Fácil Customização' },
    { id: 6, name: 'Segurança Avançada' },
  ];
  const toggleFeature = (id) => {
    if (features.includes(id)) {
      setFeatures(features.filter(featureId => featureId !== id));
    } else {
      setFeatures([...features, id]);
    }
  };
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
        features: features,
        buyLink,
        contactLink,
        imageURL: downloadURL,
        createdAt: serverTimestamp(),
        views: 0,
        hot: 0,
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


  return (
    <div id='secure-form' style={{
      margin: "10rem 0",
      width: "800px",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

    }}>
      <br />
      <br />
      <br />
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <h2>1 - Your info:</h2>
        <div className="grid-1">
          <div className="input-container">
            <label>Your Name</label>
            <br />
            <input
              type="text"
              placeholder=""
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              required
            />

          </div>
          <br />

          <div className="input-container">
            <label>Profile Link</label>
            <br />

            <input
              type="text"
              placeholder=""
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
            />

          </div>
        </div>

        <br />

        <h2>2 - Site Info:</h2>
        <div className="grid-1">
          <div className="input-container">
            <label>Site Name</label>
            <br />

            <input
              type="text"
              placeholder=""
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />

          </div>

          <br />



          <div className="step-category">
            <div className="input-container">
              <label>Pick a Category</label>
              <br />

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
          <br />
          <div className="step-category">
            <div className="input-container">
              <label>Pick a Tool</label>
              <br />

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
        <br />
        <div className="input-container text-input">
          <label>Description</label>

          <br />

          <textarea
            type="text"
            placeholder=""
            value={description}
            maxLength={250}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>
        <br />

        {featuresList.map(feature => (
          <div className='features' key={feature.id}>
            <input
              type='checkbox'
              id={feature.id}
              checked={features.includes(feature.name)}
              onChange={() => toggleFeature(feature.name)}
            />
            <label htmlFor={feature.id}>{feature.name}</label>
          </div>
        ))}

        <br />

        <div className="input-container">
          <label>Site Price</label>
          <div className="range">
            <input
              type="range"
              id="range1"
              min="0"
              max="1000"
              step="5"
              value={sitePrice}
              onChange={(e) => setSitePrice(Number(e.target.value))}
            />
          </div>
          <p>{sitePrice === 0 ? 'Free' : `$${sitePrice}`}</p>
        </div>
        <br />

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
              Image required
            </motion.p>
          )}
        </div>
        <br />
        <h2>3 - Site Links:</h2>

        <div className="grid-1">
          <div className="input-container">
            <label>Live Preview Link</label>
            <br />
            <input
              type="text"
              placeholder=""
              value={livePreview}
              onChange={(e) => setLivePreview(e.target.value)}
              required
            />

          </div>
          <br />
          <div className="input-container">
            <label>Buy Link</label>
            <br />
            <input
              type="text"
              placeholder=""
              value={buyLink}
              onChange={(e) => setBuyLink(e.target.value)}
              required
            />

          </div>
          <br />
          <div className="input-container">
            <label>Contact Link</label>
            <br />
            <input
              type="text"
              placeholder=""
              value={contactLink}
              onChange={(e) => setContactLink(e.target.value)}
              required
            />

          </div>
        </div>
        <br />
        <br />
        <div className="buttons-register-wrapper">
          <div className="button-register-wrapper">
            <button type="submit" style={{ width: 250, background: "#000", padding: "16px", color: "#fff" }}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecureForm;
