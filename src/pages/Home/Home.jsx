// Home.js
import React from "react";
import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";
import HomeFeatures from "./HomeFeatures/HomeFeatures";
import HomeBenefits from "./HomeBenefits/HomeBenefits";
import HomeTestimonials from "./HomeTestimonials/HomeTestimonials";
import HomeWhatIs from "./HomeWhatIs/HomeWhatIs";
import HomeFAQs from "./HomeFAQs/HomeFAQs";

import Transition from "../../utils/Transition/Transition";
import "./Home.scss";

const Home = () => {
    return (
        <div id="home">
            <HomeHero />
            <HomeSites />
            <HomeWhatIs />
            <HomeFeatures />
            <HomeTestimonials />
            <HomeBenefits />
            <HomeFAQs />
        </div>
    );
};

export default Transition(Home, { text: '' }); // Empty text for Home to show Quimplo logo
