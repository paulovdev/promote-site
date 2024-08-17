import React from 'react';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';

import "./ToolStep.scss"

const ToolStep = ({ tool, setTool, setStep }) => {
  const tools = [
    { name: 'Drupal', icon: <FaDrupal /> },
    { name: 'Elementor', icon: <FaElementor /> },
    { name: 'Framer', icon: <SiFramer /> },
    { name: 'Ghost', icon: <SiGhost /> },
    { name: 'HTML/CSS/JS', icon: <FaHtml5 /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Webflow', icon: <SiWebflow /> },
    { name: 'Wix', icon: <SiWix /> },
    { name: 'WordPress', icon: <FaWordpress /> },
  ];

  return (
    <section id='tool-step'>
      <h3>Select Tool</h3>
      <p>Select the tool or platform you used to create your site. This will help users understand the technologies involved.</p>
      <div className="tool-cards">
        {tools.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => setTool(name.toLowerCase())}
            className={tool === name.toLowerCase() ? 'selected' : 'tool-card'}
          >
            <div className="icon">{icon}</div>
            <div className="tool-name">{name}</div>
          </div>
        ))}
      </div>

      <div className="step-buttons">
        <button onClick={() => setStep((prev) => prev - 1)} className="back-button">Back</button>
        <button onClick={() => setStep((prev) => prev + 1)}>Continue</button>
      </div>
    </section>
  );
};

export default ToolStep;
