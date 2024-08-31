import React from "react";

import { CiFileOn } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { PiHandTapThin } from "react-icons/pi";
import { MdOutlineDone } from "react-icons/md";

import "./HomeFeatures.scss";

const features = [
    {
        icon: <PiHandTapThin />,
        title: "Selecione seu template",
        description: "Escolha o melhor template ou template que deseja vender."
    },
    {
        icon: <CiFileOn />,
        title: "Preencha o formulário e publique",
        description: "Complete todas as informações necessárias e envie seu template para revisão."
    },
    {
        icon: <CiClock1 />,
        title: "Aguarde a revisão",
        description: "Uma vez enviado, seu template será revisado. Você também pode optar por um destaque para aparecer no topo."
    },
    {
        icon: <MdOutlineDone />,
        title: "Feito!",
        description: "Seu template está sendo configurado e estará no ar em breve!"
    },
];

const HomeFeatures = () => {
    return (
        <section id="home-features">
            <span>Como funciona o Quimplo?</span>
            <h1>É fácil publicar no Quimplo!</h1>
            <div className="features-content">
                {features.map((feature, index) => (
                    <div className="card">
                        <div className="icon-card">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
