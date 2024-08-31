// Home.js
import React from "react";
import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";
import HomeFeatures from "./HomeFeatures/HomeFeatures";

import HomeFAQs from "./HomeFAQs/HomeFAQs";

import Transition from "../../utils/Transition/Transition";
import "./Home.scss";
import HomeNewsLetter from "./HomeNewsLetter/HomeNewsLetter";
import HomeLogos from "./HomeLogos/HomeLogos";

const Home = () => {
    return (
        <div id="home">
            <HomeHero />
            <HomeSites />

            <HomeFeatures />
            <HomeLogos />
            <HomeFAQs />
            <HomeNewsLetter />
        </div>
    );
};

export default Transition(Home, { text: '' }); // Empty text for Home to show Quimplo logo
