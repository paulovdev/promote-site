import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";
import HomeFeatures from "./HomeFeatures/HomeFeatures";
import HomeFAQs from "./HomeFAQs/HomeFAQs";
import HomeNewsLetter from "./HomeNewsLetter/HomeNewsLetter";
import HomeLogos from "./HomeLogos/HomeLogos";
import HomeSitesFeatured from "./HomeSitesFeatured/HomeSitesFeatured";

import Transition from "../../utils/Transition/Transition";
import "./Home.scss";

const Home = () => {
    const [showSites, setShowSites] = useState(false);
    const [showSitesFeatured, setShowSitesFeatured] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);
    const [showLogos, setShowLogos] = useState(false);
    const [showFAQs, setShowFAQs] = useState(false);
    const [showNewsLetter, setShowNewsLetter] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setShowSites(true), 0),
            setTimeout(() => setShowSitesFeatured(true), 1000),
            setTimeout(() => setShowFeatures(true),1500),
            setTimeout(() => setShowLogos(true), 2000),
            setTimeout(() => setShowFAQs(true), 2500),
            setTimeout(() => setShowNewsLetter(true), 3000),
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Quimplo</title>
            </Helmet>
            <div id="home">
                <HomeHero />
                {showSites && <HomeSites />}
                {showSitesFeatured && <HomeSitesFeatured />}
                {showFeatures && <HomeFeatures />}
                {showLogos && <HomeLogos />}
                {showFAQs && <HomeFAQs />}
                {showNewsLetter && <HomeNewsLetter />}
            </div>
        </>
    );
};

export default Transition(Home, { text: '' });
