import React from 'react';
import { FaBlog, FaBusinessTime, FaPalette, FaGraduationCap, FaShoppingCart, FaHeartbeat, FaPlane, FaRegCopyright  } from 'react-icons/fa';
import { MdEvent,  MdOutlineWeb, MdPhotoCamera } from 'react-icons/md';
import { AiOutlineFundProjectionScreen, AiOutlineBarChart } from 'react-icons/ai';
import { GiMeal } from 'react-icons/gi';
import { IoMdGlobe } from 'react-icons/io';
import "./CategoryStep.scss";

const CategoryStep = ({ category, setCategory, setStep }) => {
  const categories = [
    { name: 'blog', icon: <FaBlog /> },
    { name: 'business', icon: <FaBusinessTime /> },
    { name: 'creative', icon: <FaPalette /> },  // Ícone para 'creative'
    { name: 'educational', icon: <FaGraduationCap /> },
    { name: 'e-commerce', icon: <FaShoppingCart /> },
    { name: 'event', icon: <MdEvent /> },
    { name: 'health-wellness', icon: <FaHeartbeat /> },  // Ícone para 'health-wellness'
    { name: 'landing-page', icon: <MdOutlineWeb /> },  // Ícone para 'landing-page'
    { name: 'non-profit', icon: <FaRegCopyright  /> },
    { name: 'photography', icon: <MdPhotoCamera /> },
    { name: 'portfolio', icon: <AiOutlineFundProjectionScreen /> },
    { name: 'restaurant', icon: <GiMeal /> },
    { name: 'saas', icon: <AiOutlineBarChart /> },  // Ícone para 'saas'
    { name: 'technology', icon: <AiOutlineBarChart /> },  // Ícone genérico para 'technology'
    { name: 'travel', icon: <FaPlane /> }
  ];

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

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default CategoryStep;
