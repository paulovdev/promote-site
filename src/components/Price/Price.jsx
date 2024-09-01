import React from 'react';

import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import './Price.scss';

const Price = ({ onClick }) => {
    return (
        <section id="price">
            <div className="plans">
                <div className="plan">
                    <div className="left-content">
                        <h3 className="plan-title">Básico <p className="cost">Grátis</p></h3>
                        <button onClick={onClick}>Publique seu site agora</button>
                    </div>

                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />Upload de templates ilimitado</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />Tempo de espera limitado</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />Seu template na página inicial</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />Seu template na aba "em destaque"</li>
                    </ul>

                </div>

                <div className="plan">
                    <div className="left-content">
                        <h3 className="plan-title">Premium <p className="cost">R$30</p></h3>
                        <button onClick={onClick} disabled>'Em andamento'</button>
                    </div>
                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />Upload de templates ilimitado</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />Tempo de espera limitado</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />Seu template na página inicial</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />Seu template na aba "em destaque"</li>
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default Price;
