import React, { useState, useEffect } from 'react';
import { FaBlog, FaBusinessTime, FaPalette, FaGraduationCap, FaShoppingCart, FaHeartbeat, FaPlane, FaRegCopyright, FaBorderAll } from 'react-icons/fa';
import { MdEvent, MdOutlineWeb, MdPhotoCamera } from 'react-icons/md';
import { AiOutlineFundProjectionScreen, AiOutlineBarChart } from 'react-icons/ai';
import { GiMeal } from 'react-icons/gi';
import './CategoryStep.scss';
import { useTranslation } from 'react-i18next';

const CategoryStep = ({ setCategory, setStep }) => {
  const { t } = useTranslation();
  const [category, setLocalCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Recuperar a categoria do sessionStorage ao montar o componente
    const savedCategory = sessionStorage.getItem('category');
    if (savedCategory) {
      setLocalCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    // Salvar a categoria no sessionStorage sempre que mudar
    sessionStorage.setItem('category', category);
  }, [category]);

  const categories = [
    { name: t('categories.all'), icon: <FaBorderAll />, path: "/sites/all" },
    { name: t('categories.featured'), icon: <AiOutlineBarChart />, path: "/sites/hot" },
    { name: t('categories.blog'), icon: <FaBlog />, path: "/sites/blog" },
    { name: t('categories.business'), icon: <FaBusinessTime />, path: "/sites/business" },
    { name: t('categories.creative'), icon: <FaPalette />, path: "/sites/creative" },
    { name: t('categories.educational'), icon: <FaGraduationCap />, path: "/sites/educational" },
    { name: t('categories.ecommerce'), icon: <FaShoppingCart />, path: "/sites/e-commerce" },
    { name: t('categories.event'), icon: <MdEvent />, path: "/sites/event" },
    { name: t('categories.health'), icon: <FaHeartbeat />, path: "/sites/health-wellness" },
    { name: t('categories.landingPage'), icon: <MdOutlineWeb />, path: "/sites/landing-page" },
    { name: t('categories.nonProfit'), icon: <FaRegCopyright />, path: "/sites/non-profit" },
    { name: t('categories.photography'), icon: <MdPhotoCamera />, path: "/sites/photography" },
    { name: t('categories.portfolio'), icon: <AiOutlineFundProjectionScreen />, path: "/sites/portfolio" },
    { name: t('categories.restaurant'), icon: <GiMeal />, path: "/sites/restaurant" },
    { name: t('categories.saas'), icon: <AiOutlineBarChart />, path: "/sites/saas" },
    { name: t('categories.technology'), icon: <AiOutlineBarChart />, path: "/sites/technology" },
    { name: t('categories.travel'), icon: <FaPlane />, path: "/sites/travel" }
  ];

  const handleContinue = () => {
    setSubmitted(true);
    if (category) {
      setStep((prev) => prev + 1);
    } else {
      setError(t('categoryStep.error'));
    }
  };

  return (
    <>
      <section id='category-step'>

        <div className="category-cards">
          {categories.map((cat) => (
            <div
              key={cat.path}
              onClick={() => {
                setLocalCategory(cat.path);
                setCategory(cat.path); // Atualiza o estado no componente pai
              }}
              className={category === cat.path ? 'selected' : 'category-card'}
            >
              <div className="icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
            </div>
          ))}
        </div>

        {submitted && !category && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </section>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">{t('categoryStep.back')}</button>
        <button onClick={handleContinue} type='button'>{t('categoryStep.continue')}</button>
      </div>
    </>
  );
};

export default CategoryStep;
