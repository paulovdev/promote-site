import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./HomeHero.scss";

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <section id="home-hero">
      <h1 dangerouslySetInnerHTML={{ __html: t('homeHero.title') }} />
      <p>{t('homeHero.description')}</p>
      <div
        className="home-button"
      >
        <Link to="/sites/all" className="home-button-content" onClick={() => scrollTo({ top: 0 })}>
          {t('homeHero.buttonText')} <FaArrowRightLong />
        </Link>
        <Link to="/sites/all" className="home-button-content-2" onClick={() => scrollTo({ top: 0 })}>
          {t('homeHero.buttonText2')} <FaArrowRightLong />
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
