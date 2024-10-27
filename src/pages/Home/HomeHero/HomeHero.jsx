import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import { useTranslation } from "react-i18next";
import "./HomeHero.scss";

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero-section">
      <span>{t('homeHero.span')}</span>
      <h1>{t('homeHero.title')}</h1>
      <p>{t('homeHero.description')}</p>
      <div className="hero-buttons">
        <Link to="/sites/all" className="hero-button" onClick={() => scrollTo({ top: 0 })}>
          {t('homeHero.buttonText')} <FaArrowRightLong />
        </Link>
        <Link to="/create" className="hero-button secondary" onClick={() => scrollTo({ top: 0 })}>
          {t('homeHero.buttonText2')} <FaArrowRightLong />
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;