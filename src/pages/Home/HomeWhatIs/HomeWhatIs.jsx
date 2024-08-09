import React from 'react';
import { motion } from 'framer-motion';
import './HomeWhatIs.scss';

const HomeWhatIs = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const textVariants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: '0%' },
    };

    const textPhrases = [
        "Do you need to highlight and",
        "sell your website faster?",
        "Then you're in the right place!",
    ];

    return (
        <section id="home-what-is">  
        <span>What is Quimplo?</span>
            <div className="home-what-is-content">
                <div className="left-content">
                    <h1>
                        {textPhrases.map((phrase, index) => (
                            <motion.div
                                className="text-phrase"
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <motion.h1
                                    variants={textVariants}
                                    transition={{ duration: 0.5 }}
                                >
                                    {phrase}
                                </motion.h1>
                            </motion.div>
                        ))}
                    </h1>
                </div>
                <div className="right-content">
                    <p>Quimplo is a marketplace designed to help developers and designers sell their websites and templates. We focus on helping you gain visibility and accelerate your sales process.</p>
                    <p>Our platform allows you to list your site, gain exposure, and easily manage your listings.</p>
                </div>
            </div>
        </section>
    );
};

export default HomeWhatIs;
