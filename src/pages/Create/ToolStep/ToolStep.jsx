import React, { useState } from 'react';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import "./ToolStep.scss";
import { DiCss3, DiJavascript1 } from 'react-icons/di';

const ToolStep = ({ tool, setTool, setStep }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const tools = [
    { name: 'Drupal', icon: <FaDrupal /> },
    { name: 'Elementor', icon: <FaElementor /> },
    { name: 'Framer', icon: <SiFramer /> },
    { name: 'Ghost', icon: <SiGhost /> },
    {
      name: 'HTML/CSS/JS', icons: [
        <FaHtml5 />,
        <DiCss3 />,
        <DiJavascript1 />,
      ]
    },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Webflow', icon: <SiWebflow /> },
    { name: 'Wix', icon: <SiWix /> },
    { name: 'WordPress', icon: <FaWordpress /> },
  ];

  const handleContinue = () => {
    setSubmitted(true);
    if (tool) {
      setStep((prev) => prev + 1);
    } else {
      setError('Por favor, selecione uma ferramenta.');
    }
  };

  return (
    <section id='tool-step'>
      <p>Selecione a ferramenta ou plataforma que você usou para criar seu site. Isso ajudará os usuários a entender as tecnologias envolvidas.</p>

      <div className="tool-cards">
        {tools.map(({ name, icon, icons }) => (
          <div
            key={name}
            onClick={() => setTool(name.toLowerCase())}
            className={tool === name.toLowerCase() ? 'selected' : 'tool-card'}
          >
            <div className="icon">
              {icons ? icons : icon}
            </div>
            <div className="tool-name">{name}</div>
          </div>
        ))}
      </div>

      {submitted && !tool && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">Voltar</button>
        <button onClick={handleContinue} type='button'>Continuar</button>
      </div>
    </section>
  );
};

export default ToolStep;
