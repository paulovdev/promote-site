import React from "react";
import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";
import HomeFeatures from "./HomeFeatures/HomeFeatures";
import HomeBenefits from "./HomeBenefits/HomeBenefits";
import HomeTestimonials from "./HomeTestimonials/HomeTestimonials";
import HomeWhatIs from "./HomeWhatIs/HomeWhatIs";
import HomeFAQs from "./HomeFAQs/HomeFAQs";
import "./Home.scss";

const Home = () => {
    return (
        <div id="home">
            <HomeHero />
            <HomeSites />
            <HomeFeatures />
            <HomeWhatIs />
            <HomeBenefits />
            <HomeTestimonials />
            <HomeFAQs />
        </div>
    );
};

export default Home;
