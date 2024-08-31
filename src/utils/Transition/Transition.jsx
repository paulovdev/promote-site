import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiLastPage } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import './Transition.scss';

const Transition = (OgComponent, additionalProps) => {
    return (props) => {
        const [animationComplete, setAnimationComplete] = useState(false);
        const location = useLocation();
        const showLogo = location.pathname === '/';
        const { text } = additionalProps || {};

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
                <OgComponent {...props} />

                <motion.div
                    className='slide-in'
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 1
                    }}
                >
                </motion.div>

                <motion.div className='slide-out'
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
                    onAnimationComplete={() => setAnimationComplete(true)}
                >
                    {showLogo ? (
                        <motion.div
                            className='quimplo-logo-container'
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -75 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <div className="quimplo-logo">
                                <BiLastPage /> Quimplo
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className='quimplo-logo-container'
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -75 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <div className="text">
                                {text}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </>
        );
    };
};

export default Transition;
