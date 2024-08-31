// Home.js
import React from "react";
import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";
import HomeFeatures from "./HomeFeatures/HomeFeatures";
import HomeFAQs from "./HomeFAQs/HomeFAQs";
import HomeNewsLetter from "./HomeNewsLetter/HomeNewsLetter";
import HomeLogos from "./HomeLogos/HomeLogos";

import Transition from "../../utils/Transition/Transition";
import "./Home.scss";

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

export default Transition(Home, { text: '' });
