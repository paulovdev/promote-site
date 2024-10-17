import React from "react";
import { Helmet } from "react-helmet";

import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";

import Transition from "../../utils/Transition/Transition";
import "./Home.scss";
import HomeNewsLetter from './HomeNewsLetter/HomeNewsLetter';

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
                <HomeNewsLetter />
            </main>
        </>
    );
};

export default Transition(Home, { text: '' });
