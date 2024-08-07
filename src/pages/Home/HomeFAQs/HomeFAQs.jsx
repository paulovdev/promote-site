import React from "react";
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
    return (
        <section id="home-faqs">
            <div className="text-content">
                <h1>Frequently <span>asked questions</span></h1>
            </div>
            <div className="faqs">
                {faqs.map((faq, index) => (
                    <div className="faq-card" key={index}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeFAQs;
