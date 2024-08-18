import React, { useState } from 'react';
import { FaBlog, FaBusinessTime, FaPalette, FaGraduationCap, FaShoppingCart, FaHeartbeat, FaPlane, FaRegCopyright } from 'react-icons/fa';
import { MdEvent, MdOutlineWeb, MdPhotoCamera } from 'react-icons/md';
import { AiOutlineFundProjectionScreen, AiOutlineBarChart } from 'react-icons/ai';
import { GiMeal } from 'react-icons/gi';
import { IoMdGlobe } from 'react-icons/io';
import "./CategoryStep.scss";

const CategoryStep = ({ category, setCategory, setStep }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { name: 'blog', icon: <FaBlog /> },
    { name: 'business', icon: <FaBusinessTime /> },
    { name: 'creative', icon: <FaPalette /> },
    { name: 'educational', icon: <FaGraduationCap /> },
    { name: 'e-commerce', icon: <FaShoppingCart /> },
    { name: 'event', icon: <MdEvent /> },
    { name: 'health-wellness', icon: <FaHeartbeat /> },
    { name: 'landing-page', icon: <MdOutlineWeb /> },
    { name: 'non-profit', icon: <FaRegCopyright /> },
    { name: 'photography', icon: <MdPhotoCamera /> },
    { name: 'portfolio', icon: <AiOutlineFundProjectionScreen /> },
    { name: 'restaurant', icon: <GiMeal /> },
    { name: 'saas', icon: <AiOutlineBarChart /> },
    { name: 'technology', icon: <AiOutlineBarChart /> },
    { name: 'travel', icon: <FaPlane /> }
  ];

  const handleContinue = () => {
    setSubmitted(true);
    if (category) {
      setStep((prev) => prev + 1);
    } else {
      setError('Please select a category.');
    }
  };

  return (
    <section id='category-step'>
      <h3>Select Category</h3>
      <p>Choose the category that best fits your site. This helps in organizing and finding your site.</p>

      <div className="category-cards">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setCategory(cat.name)}
            className={category === cat.name ? 'selected' : 'category-card'}
          >
            <div className="icon">{cat.icon}</div>
            <div className="category-name">{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</div>
          </div>
        ))}
      </div>

      {submitted && !category && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Back</button>
        <button onClick={handleContinue} type='button' >Continue</button>
      </div>
    </section>
  );
};

export default CategoryStep;
