import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./FAQs.scss";

const FAQs = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(null);

    const toggleFAQ = (index) => {
        setSelected(selected === index ? null : index);
    };

    return (
        <section id="home-faqs">
            <div className="text-content">
                <span>{t('homeFAQs.sectionTitle')}</span>
                <h1>{t('homeFAQs.sectionSubtitle')}</h1>
            </div>
            <div className="faqs">
                {t('homeFAQs.faqs', { returnObjects: true }).map((faq, index) => (
                    <div
                        key={index}
                        className="faq-card"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-header">
                            <h3>{faq.question}</h3>
                            {selected === index ? (
                                <FaChevronUp />
                            ) : (
                                <FaChevronDown />
                            )}
                        </div>
                        <AnimatePresence>
                            {selected === index && (
                                <motion.div
                                    className="faq-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p>{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;
