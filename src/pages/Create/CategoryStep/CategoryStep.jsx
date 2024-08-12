import React from 'react';
import "./CategoryStep.scss";

const CategoryStep = ({ category, setCategory, setStep }) => {
  const categories = [
    'blog', 'business', 'creative', 'educational', 'e-commerce',
    'event', 'health-wellness', 'landing-page', 'non-profit',
    'photography', 'portfolio', 'restaurant', 'saas', 'technology', 'travel'
  ];

  return (
    <section id='category-step'>
      <h3>Select Category</h3>
      <p>Choose the category that best fits your site. This helps in organizing and finding your site.</p>

      <div className="category-cards">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setCategory(cat)}
            className={category === cat ? 'selected' : 'category-card'}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
