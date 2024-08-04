import React from "react";
import "./HomeFAQs.scss";

const faqs = [
    {
        question: "How does Quimplo help sell my site?",
        answer: "Quimplo provides a platform to showcase your website, making it easier for potential buyers to find and purchase it."
    },
    {
        question: "What are the fees?",
        answer: "Quimplo charges a small fee on each sale, which helps us maintain the platform and promote your listings."
    }, {
        question: "How does Quimplo help sell my site?",
        answer: "Quimplo provides a platform to showcase your website, making it easier for potential buyers to find and purchase it."
    },
    {
        question: "What are the fees?",
        answer: "Quimplo charges a small fee on each sale, which helps us maintain the platform and promote your listings."
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
