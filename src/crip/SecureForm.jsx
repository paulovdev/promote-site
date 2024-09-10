import React, { useState, useRef } from 'react';
import { db, storage } from '../firebase/Firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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
    { id: 1, name: 'Design Responsivo' },
    { id: 2, name: 'Navegação Responsiva' },
    { id: 3, name: 'Slider Responsivo' },
    { id: 4, name: 'Lightbox de Mídia' },
    { id: 5, name: 'Vídeo de Fundo' },
    { id: 6, name: 'Transformações 3D' },
    { id: 7, name: 'Interações' },
    { id: 8, name: 'Formulários' },
    { id: 9, name: 'Símbolos' },
    { id: 10, name: 'Grade CSS' },
    { id: 11, name: 'Página 404 Personalizada' },
    { id: 12, name: 'Fontes Web' },
    { id: 13, name: 'Pronto para Retina' },
    { id: 14, name: 'Sistema de Gerenciamento de Conteúdo' },
    { id: 15, name: 'E-commerce' },
    { id: 16, name: 'Animações CSS' },
    { id: 17, name: 'Compatibilidade entre Navegadores' },
    { id: 18, name: 'Integração com Mídias Sociais' },
    { id: 19, name: 'Otimização para SEO' },
    { id: 20, name: 'Suporte Multilíngue' }
  ];

  const featuresListEn = [
    { id: 1, name: 'Responsive Design' },
    { id: 2, name: 'Responsive Navigation' },
    { id: 3, name: 'Responsive Slider' },
    { id: 4, name: 'Media Lightbox' },
    { id: 5, name: 'Background Video' },
    { id: 6, name: '3D Transformations' },
    { id: 7, name: 'Interactions' },
    { id: 8, name: 'Forms' },
    { id: 9, name: 'Symbols' },
    { id: 10, name: 'CSS Grid' },
    { id: 11, name: 'Custom 404 Page' },
    { id: 12, name: 'Web Fonts' },
    { id: 13, name: 'Retina Ready' },
    { id: 14, name: 'Content Management System' },
    { id: 15, name: 'E-commerce' },
    { id: 16, name: 'CSS Animations' },
    { id: 17, name: 'Cross-browser Compatibility' },
    { id: 18, name: 'Social Media Integration' },
    { id: 19, name: 'SEO Optimization' },
    { id: 20, name: 'Multilingual Support' }
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

      await setDoc(doc(db, `sites/${siteName.toLowerCase()}`), {
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

        <h2>3 - Features</h2>

        <div className="features-container">
          <div className="features-column">
            <h3>Features (BR)</h3>
            <ul>
              {featuresListBr.map(feature => (
                <li key={feature.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={featuresBr.includes(feature.name)}
                      onChange={() => toggleFeatureBr(feature.name)}
                    />
                    {feature.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="features-column">
            <h3>Features (EN)</h3>
            <ul>
              {featuresListEn.map(feature => (
                <li key={feature.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={featuresEn.includes(feature.name)}
                      onChange={() => toggleFeatureEn(feature.name)}
                    />
                    {feature.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>4 - Others:</h2>
        <div className="grid-2">
          <div className="input-container">
            <label>Price</label>
            <br />
            <input
              type="number"
              placeholder=""
              value={sitePrice}
              onChange={(e) => setSitePrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <br />

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

        <h2>5 - Image Upload:</h2>
        <div className="step-image-upload">
          <div className="image-upload-container">
            <input
              type="file"
              ref={imageRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <motion.div
              className="image-upload-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <IoImageOutline size={24} />
              <span>Upload Image</span>
            </motion.div>
            {image && (
              <div className="image-preview">
                <motion.img
                  src={URL.createObjectURL(image)}
                  width={150}
                  alt="Preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="image-remove-button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setImage(null)}
                >
                  <IoCloseOutline size={24} />
                </motion.div>
              </div>
            )}
            {!isPhotoValid && <p style={{ color: 'red' }}>Please upload an image.</p>}
          </div>
        </div>

        <div className="button-container">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default SecureForm;
