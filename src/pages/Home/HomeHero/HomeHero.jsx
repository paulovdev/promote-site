import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import "./HomeHero.scss";

const HomeHero = () => {
  return (
    <section id="home-hero">
      <span>Welcome to Quimplo!</span>
      <h1>Enhance your website and make an impact!</h1>
      <p>
        Launch your website on Quimplo and significantly boost your online
        visibility. Showcase your site effortlessly to attract more visitors
        and achieve faster sales.
      </p>
      <motion.div
        className="home-button"
        whileHover={{ scale: 1.05, }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}

      >
        <Link to="/sites/all" className="home-button-content" onClick={() => scrollTo({ top: 0 })}>
          Explore  <FaArrowRightLong />
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeHero;
