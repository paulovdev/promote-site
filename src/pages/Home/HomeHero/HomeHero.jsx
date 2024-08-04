import React from "react";
import { Link } from "react-router-dom";
import { TbArrowNarrowRight } from "react-icons/tb";
import "./HomeHero.scss";

const HomeHero = () => {
  return (
    <section id="home-hero">
      <h1>Boost your website and get noticed!</h1>
      <p>Launch your website on Quimplo and gain visibility! Sell your site faster and easier.</p>
      <div className="home-button" onClick={() => scrollTo({ top: 0 })}>
        <Link to="/sites/all" className="home-button-content">
          Explore websites <div className="ball-button"><TbArrowNarrowRight /></div>
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
