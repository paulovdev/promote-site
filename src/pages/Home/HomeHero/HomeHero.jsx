import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import "./HomeHero.scss";

const HomeHero = () => {
  return (
    <section id="home-hero">
      <h1>Eleve seu <span>site</span> e cause um impacto duradouro!</h1>
      <p>
        Lance seu site no Quimplo e aumente drasticamente sua visibilidade online.
        Mostre seu site com facilidade para atrair mais visitantes e acelerar suas vendas.
      </p>
      <motion.div
        className="home-button"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Link to="/sites/all" className="home-button-content" onClick={() => scrollTo({ top: 0 })}>
          Explore <FaArrowRightLong />
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeHero;
