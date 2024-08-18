import React, { useState } from "react";
import { motion } from "framer-motion";
import "./HomeFAQs.scss";

const faqs = [
    {
        question: "How can Quimplo help me sell my website?",
        answer: "Quimplo offers a platform where you can list and showcase your site, increasing its visibility to potential buyers and making the sale process easier."
    },
    {
        question: "What fees are associated with selling on Quimplo?",
        answer: "Quimplo takes a small commission from each sale, which supports the platform's upkeep and helps in promoting your listings to a wider audience."
    },
    {
        question: "What advantages does Quimplo offer for selling my site?",
        answer: "By listing your site on Quimplo, you gain access to a marketplace designed to connect you with buyers, simplifying the selling process and boosting your site's exposure."
    },
    {
        question: "Are there any costs involved with using Quimplo?",
        answer: "Yes, Quimplo applies a modest fee on each transaction. This fee ensures the platform remains maintained and helps fund the promotion of your website."
    },
    {
        question: "Can Quimplo help me reach more buyers?",
        answer: "Absolutely. Quimplo's platform is designed to give your site maximum exposure, connecting you with a broader audience of potential buyers."
    },
    {
        question: "Is there a listing fee on Quimplo?",
        answer: "Quimplo does not charge a fee to list your website. Instead, a small fee is taken from successful sales to support platform operations and marketing efforts."
    },
    {
        question: "How does Quimplo enhance my site's visibility?",
        answer: "Quimplo uses targeted marketing and a user-friendly interface to make your site stand out, attracting more interest from potential buyers."
    },
    {
        question: "What support does Quimplo provide during the selling process?",
        answer: "Quimplo offers tools and resources to help you create a compelling listing, and our support team is available to assist with any questions you may have."
    },
];

const HomeFAQs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? 1 : index);
    };

    return (
        <section id="home-faqs">
            <div className="text-content">
                <h1>Frequently Asked Questions</h1>
                <p>In case you missed anything, we answered some frequently asked questions. </p>
            </div>
            <div className="faqs">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        className="faq-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                        whileHover={{ scale: 1.03, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
                        onClick={() => handleClick(index)}
                    >
                        <h3>{faq.question}</h3>
                        <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: activeIndex === index ? "auto" : 0, opacity: activeIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {faq.answer}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HomeFAQs;
