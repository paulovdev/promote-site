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
  const [descriptionBr, setDescriptionBr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [category, setCategory] = useState('');
  const [tool, setTool] = useState('');
  const [livePreview, setLivePreview] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [featuresEn, setFeaturesEn] = useState([]);
  const [featuresBr, setFeaturesBr] = useState([]);
  const [sitePrice, setSitePrice] = useState(0);

  const imageRef = useRef();

  const featuresListBr = [
    { id: 1, name: 'Responsivo' },
    { id: 2, name: 'SEO Otimizado' },
    { id: 3, name: 'Integração com Redes Sociais' },
    { id: 4, name: 'Carregamento Rápido' },
    { id: 5, name: 'Fácil Customização' },
    { id: 6, name: 'Segurança Avançada' },
  ];

  const featuresListEn = [
    { id: 1, name: 'Responsive' },
    { id: 2, name: 'SEO Optimized' },
    { id: 3, name: 'Social Media Integration' },
    { id: 4, name: 'Fast Loading' },
    { id: 5, name: 'Easy Customization' },
    { id: 6, name: 'Advanced Security' },
  ];

  const toggleFeatureBr = (id) => {
    if (featuresBr.includes(id)) {
      setFeaturesBr(featuresBr.filter(featureId => featureId !== id));
    } else {
      setFeaturesBr([...featuresBr, id]);
    }
  };

  const toggleFeatureEn = (id) => {
    if (featuresEn.includes(id)) {
      setFeaturesEn(featuresEn.filter(featureId => featureId !== id));
    } else {
      setFeaturesEn([...featuresEn, id]);
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
        descriptionBr,
        descriptionEn,
        featureBr: featuresBr,
        featureEn: featuresEn,
        category,
        tool,
        price: sitePrice,
        livePreview,
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
      setDescriptionBr('');
      setDescriptionEn('');
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
          <label>Description BR</label>
          <br />
          <textarea
            type="text"
            placeholder=""
            value={descriptionBr}
            maxLength={250}
            onChange={(e) => setDescriptionBr(e.target.value)}
          />
        </div>
        <br />
        <div className="input-container text-input">
          <label>Description EN</label>
          <br />
          <textarea
            type="text"
            placeholder=""
            value={descriptionEn}
            maxLength={250}
            onChange={(e) => setDescriptionEn(e.target.value)}
          />
        </div>
        <br />

        {featuresListBr.map(feature => (
          <div className='features' key={feature.id}>
            <input
              type='checkbox'
              id={`br-${feature.id}`}
              checked={featuresBr.includes(feature.name)}
              onChange={() => toggleFeatureBr(feature.name)}
            />
            <label htmlFor={`br-${feature.id}`}>{feature.name}</label>
          </div>
        ))}

        <br />
        <br />

        {featuresListEn.map(feature => (
          <div className='features' key={feature.id}>
            <input
              type='checkbox'
              id={`en-${feature.id}`}
              checked={featuresEn.includes(feature.name)}
              onChange={() => toggleFeatureEn(feature.name)}
            />
            <label htmlFor={`en-${feature.id}`}>{feature.name}</label>
          </div>
        ))}

        <br />
        <h2>3 - Price:</h2>
        <div className="input-container">
          <label>Site Price ($)</label>
          <br />
          <input
            type="number"
            placeholder=""
            value={sitePrice}
            onChange={(e) => setSitePrice(Number(e.target.value))}
            required
          />
        </div>
        <br />

        <h2>4 - Additional Info:</h2>
        <div className="grid-1">
          <div className="input-container">
            <label>Live Preview Link</label>
            <br />
            <input
              type="text"
              placeholder=""
              value={livePreview}
              onChange={(e) => setLivePreview(e.target.value)}
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
            />
          </div>
        </div>
        <br />

        <div>
          <h2>5 - Upload an image:</h2>
          <div className="step-category">
            <div className="input-container">
              <label>Upload Image</label>
              <br />
              <div className="image-upload">
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClick}
                  className="upload-button"
                >
                  <IoImageOutline size={50} />
                  <p>Choose Image</p>
                </motion.div>
                {image && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(image)} width={150} alt="preview" />
                    <button onClick={() => setImage(null)}>
                      <IoCloseOutline size={20} />
                    </button>
                  </div>
                )}
                {!isPhotoValid && <p className="error">Image is required!</p>}
              </div>
            </div>
          </div>
        </div>
        <br />

        <div>
          <h2>6 - Contact Info:</h2>
          <div className="input-container">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
        </div>
        <br />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
};

export default SecureForm;
