import React from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdDone, MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";

import "./HomeFeatures.scss";
import { Link } from "react-router-dom";

const features = [
    {
        icon: <AiOutlineSelect />,
        title: "Select your site",
        description: "Choose the best website or template you want to sell."
    },
    {
        icon: <FaWpforms />,
        title: "Fill out the form and publish",
        description: "Complete all the necessary information and submit your site for review."
    },
    {
        icon: <IoTimeOutline />,
        title: "Wait for review",
        description: "Once submitted, your website will be reviewed. You can also opt for a featured listing to get highlighted at the top."
    },
    {
        icon: <MdDone />,
        title: "Done!",
        description: "Your website is being set up and will be live shortly!"
    },
];

const HomeFeatures = () => {
    return (
        <section id="home-features">
            <span><MdOutlineWorkOutline /> How Quimplo's work?</span>
            <div className="features-content">
                {features.map((feature, index) => (
                    <Link to='/create' onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
                        <div
                            key={index}
                            className="card"
                        >
                            <div className="icon-card">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <button>SUBMIT YOUR WEBSITE<MdOutlineArrowRight className="button-icon" /></button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
