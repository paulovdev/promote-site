import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./HomeFAQs.scss";

const faqs = [
    {
        question: "Como o Quimplo pode me ajudar a vender meu template?",
        answer: "O Quimplo oferece uma plataforma onde você pode listar e exibir seu template, aumentando sua visibilidade para compradores em potencial e facilitando o processo de venda."
    },
    {
        question: "Quais taxas estão associadas à venda no Quimplo?",
        answer: "O Quimplo cobra uma pequena comissão de cada venda, o que ajuda na manutenção da plataforma e na promoção dos seus anúncios para um público mais amplo."
    },
    {
        question: "Quais vantagens o Quimplo oferece para vender meu template?",
        answer: "Ao listar seu template no Quimplo, você tem acesso a um marketplace projetado para conectar você com compradores, simplificando o processo de venda e aumentando a exposição do seu template."
    },
    {
        question: "Há custos envolvidos no uso do Quimplo?",
        answer: "Sim, o Quimplo aplica uma taxa modesta em cada transação. Essa taxa garante a manutenção da plataforma e ajuda a financiar a promoção do seu template."
    },
    {
        question: "O Quimplo pode me ajudar a alcançar mais compradores?",
        answer: "Absolutamente. A plataforma do Quimplo é projetada para dar ao seu template a máxima exposição, conectando você com um público mais amplo de compradores potenciais."
    },
    {
        question: "Há taxa para listar um template no Quimplo?",
        answer: "O Quimplo não cobra taxa para listar seu template. Em vez disso, uma pequena taxa é retirada das vendas bem-sucedidas para apoiar as operações da plataforma e os esforços de marketing."
    },
    {
        question: "Como o Quimplo melhora a visibilidade do meu template?",
        answer: "O Quimplo usa marketing direcionado e uma interface amigável para destacar seu template, atraindo mais interesse de compradores potenciais."
    },
    {
        question: "Que suporte o Quimplo oferece durante o processo de venda?",
        answer: "O Quimplo oferece ferramentas e recursos para ajudar você a criar um anúncio atraente, e nossa equipe de suporte está disponível para ajudar com qualquer dúvida que você possa ter."
    },
];

const HomeFAQs = () => {
    const [selected, setSelected] = useState(null);

    const toggleFAQ = (index) => {
        setSelected(selected === index ? null : index);
    };

    return (
        <section id="home-faqs">
            <div className="text-content">
                <span>Perguntas Frequentes</span>
                <h1>Se você perdeu algo, respondemos algumas perguntas frequentes.</h1>
            </div>
            <div className="faqs">
                {faqs.map((faq, index) => (
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

export default HomeFAQs;
