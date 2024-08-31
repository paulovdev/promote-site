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
    { name: 'negócios', icon: <FaBusinessTime /> },
    { name: 'criativo', icon: <FaPalette /> },
    { name: 'educacional', icon: <FaGraduationCap /> },
    { name: 'e-commerce', icon: <FaShoppingCart /> },
    { name: 'evento', icon: <MdEvent /> },
    { name: 'saúde-bem-estar', icon: <FaHeartbeat /> },
    { name: 'landing-page', icon: <MdOutlineWeb /> },
    { name: 'não-lucrativo', icon: <FaRegCopyright /> },
    { name: 'fotografia', icon: <MdPhotoCamera /> },
    { name: 'portfólio', icon: <AiOutlineFundProjectionScreen /> },
    { name: 'restaurante', icon: <GiMeal /> },
    { name: 'saas', icon: <AiOutlineBarChart /> },
    { name: 'tecnologia', icon: <AiOutlineBarChart /> },
    { name: 'viagem', icon: <FaPlane /> }
  ];

  const handleContinue = () => {
    setSubmitted(true);
    if (category) {
      setStep((prev) => prev + 1);
    } else {
      setError('Por favor, selecione uma categoria.');
    }
  };

  return (
    <section id='category-step'>
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
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Voltar</button>
        <button onClick={handleContinue} type='button' >Continuar</button>
      </div>
    </section>
  );
};

export default CategoryStep;
