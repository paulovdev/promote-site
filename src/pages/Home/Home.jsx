import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";
import HomeFeatures from "./HomeFeatures/HomeFeatures";
import HomeFAQs from "./HomeFAQs/HomeFAQs";
import HomeNewsLetter from "./HomeNewsLetter/HomeNewsLetter";


import Transition from "../../utils/Transition/Transition";
import "./Home.scss";
const Home = () => {
    const [showSites, setShowSites] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);
  
    const [showFAQs, setShowFAQs] = useState(false);
    const [showNewsLetter, setShowNewsLetter] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setShowSites(true), 0),
            setTimeout(() => setShowFeatures(true), 100),
           
            setTimeout(() => setShowFAQs(true), 300),
            setTimeout(() => setShowNewsLetter(true), 400),
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Quimplo</title>
            </Helmet>
            <main id="home">
                <HomeHero />
                {showSites && <HomeSites />}
                {showFeatures && <HomeFeatures />}
                
                {showFAQs && <HomeFAQs />}
                {showNewsLetter && <HomeNewsLetter />}
            </main>
        </>
    );
};

export default Transition(Home, { text: '' });
