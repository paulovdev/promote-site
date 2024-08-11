import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HomeWhatIs.scss';

const HomeWhatIs = () => {

    const animation = {
        initial: { y: "100%" },
        enter: i => ({ y: "0", transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i } })
    }

    const { ref, inView, entry } = useInView({
        threshold: 0.75,
        triggerOnce: true
    });

    const textPhrases = [
        "Do you need to highlight and",
        "sell your website faster?",
        "Then you're in the right place!",
    ];

    return (
        <section id="home-what-is">
            <span>What is Quimplo?</span>
            <div className="home-what-is-content" ref={ref} >
                <div className="left-content">
                    {
                        textPhrases.map((phrase, index) => {
                            return <div key={index} className='line-mask'>
                                <motion.h1 custom={index} variants={animation} initial="initial" animate={inView ? "enter" : ""}>{phrase}</motion.h1>
                            </div>
                        })
                    }
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
