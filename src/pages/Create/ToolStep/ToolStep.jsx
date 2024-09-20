import React, { useState, useEffect } from 'react';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import "./ToolStep.scss";
import { DiCss3, DiJavascript1 } from 'react-icons/di';
import { useTranslation } from 'react-i18next';

const ToolStep = ({ setTool, setStep }) => {
  const [tool, setLocalTool] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    // Recuperar a ferramenta do sessionStorage ao montar o componente
    const savedTool = sessionStorage.getItem('tool');
    if (savedTool) {
      setLocalTool(savedTool);
    }
  }, []);

  useEffect(() => {
    // Salvar a ferramenta no sessionStorage sempre que mudar
    sessionStorage.setItem('tool', tool);
  }, [tool]);

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
      setError(t('tools.error'));
    }
  };

  return (
    <>
      <section id='tool-step'>

        <div className="tool-cards">
          {tools.map(({ name, icon, icons }) => (
            <div
              key={name}
              onClick={() => {
                setLocalTool(name.toLowerCase());
                setTool(name.toLowerCase()); // Atualiza o estado no componente pai
              }}
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

      </section>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} type='button' className="back-button">{t('tools.back')}</button>
        <button onClick={handleContinue} type='button'>{t('tools.continue')}</button>
      </div>
    </>
  );
};

export default ToolStep;
