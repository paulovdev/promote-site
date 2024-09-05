import React from 'react';
import "./PriceStep.scss"

const PriceStep = ({ price, setPrice, setStep }) => {
  return (
    <section id="price-step">
      <span className='price-text'>{price === 0 ? 'Free' : `$${price}`}</span>
      <input
        type="range"
        min="0"
        max="1000"
        step="5"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />


      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)} type='button'>Continue</button>
      </div>
    </section>

  );
};

export default PriceStep;
