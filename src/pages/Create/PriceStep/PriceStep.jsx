import React from 'react';
import "./PriceStep.scss"

const PriceStep = ({ price, setPrice, setStep }) => {
  return (
    <section id="price-step">
      <h3>Set a Price</h3>
      <p>Determine the price for your site. You can choose to set it for free or assign a specific amount.</p>

      <input
        type="range"
        min="0"
        max="1000"
        step="5"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <span className='price-text'>{price === 0 ? 'Free' : `$${price}`}</span>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default PriceStep;
