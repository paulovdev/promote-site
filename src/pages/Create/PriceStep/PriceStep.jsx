import React from 'react';
import "./PriceStep.scss"

const PriceStep = ({ price, setPrice, setStep }) => {
  return (
<section id="price-step">

  <input
    type="range"
    min="0"
    max="1000"
    step="5"
    value={price}
    onChange={(e) => setPrice(Number(e.target.value))}
  />
  <span className='price-text'>{price === 0 ? 'Gratuito' : `R$${price}`}</span>

  <div className="step-buttons">
    <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Voltar</button>
    <button onClick={() => setStep((prev) => prev + 1)} type='button'>Continuar</button>
  </div>
</section>

  );
};

export default PriceStep;
