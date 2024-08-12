import React from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { motion } from "framer-motion";
import "./HomeFeatures.scss";

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
            <span>How Quimplo's work?</span>
            <div className="features-content">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="icon-card">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
