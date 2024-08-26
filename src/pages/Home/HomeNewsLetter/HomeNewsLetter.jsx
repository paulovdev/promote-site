import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HomeNewsLetter.scss';

const HomeNewsLetter = () => {

    const animation = {
        initial: { y: "100%" },
        enter: i => ({ y: "0", transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i } })
    }

    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: true
    });

    const textPhrases = [
        "Inscreva-se na newsletter de eventos do Quimplo para ser o primeiro",
        "a saber sobre novos sites"
    ];

    return (
        <section id="home-newsletter" ref={ref}>
            {
                textPhrases.map((phrase, index) => {
                    return <div key={index} className='line-mask'>
                        <motion.h1 custom={index} variants={animation} initial="initial" animate={inView ? "enter" : ""}>{phrase}</motion.h1>
                    </div>
                })
            }
            <button>Inscreva-se agora</button>
        </section>
    );
};

export default HomeNewsLetter;
