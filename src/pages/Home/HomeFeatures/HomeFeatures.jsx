import React from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";

import "./HomeFeatures.scss";
import { Link } from "react-router-dom";

const features = [
    {
        icon: <AiOutlineSelect />,
        title: "Selecione seu site",
        description: "Escolha o melhor site ou template que deseja vender."
    },
    {
        icon: <FaWpforms />,
        title: "Preencha o formulário e publique",
        description: "Complete todas as informações necessárias e envie seu site para revisão."
    },
    {
        icon: <IoTimeOutline />,
        title: "Aguarde a revisão",
        description: "Uma vez enviado, seu site será revisado. Você também pode optar por um destaque para aparecer no topo."
    },
    {
        icon: <MdDone />,
        title: "Feito!",
        description: "Seu site está sendo configurado e estará no ar em breve!"
    },
];

const HomeFeatures = () => {
    return (
        <section id="home-features">
            <span>Como funciona o Quimplo?</span>
            <h1>É fácil publicar no Quimplo!</h1>
            <div className="features-content">
                {features.map((feature, index) => (
                    <Link to='/create' onClick={() => scrollTo({ top: 0, behavior: "smooth" })} key={index}>
                        <div className="card">
                            <div className="icon-card">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
