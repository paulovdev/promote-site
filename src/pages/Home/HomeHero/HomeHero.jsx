import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import "./HomeHero.scss";
import { GoHome } from "react-icons/go";


const HomeHero = () => {
  return (
    <section id="home-hero">
      <span> < GoHome /> Welcome to Quimplo!</span>
      <h1>Elevate your website and make a lasting impact!</h1>
      <p>
        Launch your site on Quimplo and dramatically increase your online
        visibility. Showcase your site effortlessly to attract more visitors and
        accelerate your sales.
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
