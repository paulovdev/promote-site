import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BiLastPage } from 'react-icons/bi';

import { motion } from 'framer-motion';

import HomeHero from "./HomeHero/HomeHero";
import HomeSites from "./HomeSites/HomeSites";

import "./Home.scss";
import HomeNewsLetter from './HomeNewsLetter/HomeNewsLetter';

const Home = () => {
    const [animationComplete, setAnimationComplete] = useState(false);


    useEffect(() => {
        document.body.classList.add('no-scroll');

        if (animationComplete) {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [animationComplete]);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Quimplo</title>
            </Helmet>
            <motion.div
                className='slide-in'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                }}
            >
            </motion.div>

            <motion.div className='slide-out'
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                onAnimationComplete={() => setAnimationComplete(true)}
            >

                <motion.div
                    className='quimplo-logo-container'
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -75 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    <div className="quimplo-logo">
                        <BiLastPage />
                    </div>
                </motion.div>

            </motion.div>
            <main id="home">
                <HomeHero />
                <HomeSites />
                <HomeNewsLetter />
            </main>
        </>
    );
};

export default Home;
