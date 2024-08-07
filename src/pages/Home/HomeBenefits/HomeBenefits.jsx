import React from "react";
import "./HomeBenefits.scss";

const benefits = [
    {
        title: "Maximize Your Template's Visibility",
        description: "Our platform ensures your templates get the attention they deserve. With search engine optimization and featured placements in top categories, you reach a larger and more targeted audience.",
        buttonText: "Learn More"
    },
    {
        title: "Showcase Your Best Templates",
        description: "Our platform puts your templates in the spotlight. With high-visibility placements and tailored categories, your designs are seen by those who matter most—creative professionals and businesses looking for quality solutions.",
        buttonText: "See Details"
    },
    {
        title: "Gain Valuable Customer Insights",
        description: "With our detailed analytics, you can monitor how your templates are performing in real-time. Understand customer behavior, identify trends, and refine your sales strategies to maximize success.",
        buttonText: "Get Insights"
    },
    {
        title: "Seamless Template Integration",
        description: "Easily integrate your templates into a variety of platforms with our seamless integration tools, ensuring compatibility and reducing your workload.",
        buttonText: "Start Now"
    }
];

const HomeBenefits = () => {
    return (
        <section id="home-benefits">
            <div className="benefits-content">
                {benefits.map((benefit, index) => (
                    <div className={`benefit-card ${index % 5 === 3 ? 'full-width' : ''}`} key={index}>
                        <h1>{benefit.title}</h1>
                        <p>{benefit.description}</p>
                        <button className="action-button">
                            {benefit.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeBenefits;
