import React from "react";
import { Helmet } from "react-helmet";

import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";

import Transition from "../../utils/Transition/Transition";
import "./Home.scss";

const Home = () => {

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Quimplo</title>
            </Helmet>
            <main id="home">
                <HomeHero />
                <HomeSites />
            </main>
        </>
    );
};

export default Transition(Home, { text: '' });
