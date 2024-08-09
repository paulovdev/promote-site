import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
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
      <div className="home-button" onClick={() => scrollTo({ top: 0 })}>
        <Link to="/sites/all" className="home-button-content">
          Explore  <FaArrowRightLong />
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
