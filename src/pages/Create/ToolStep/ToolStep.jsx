import React from 'react';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';

import "./ToolStep.scss"

const ToolStep = ({ tool, setTool, setStep }) => {
  const tools = [
    { name: 'drupal', icon: <FaDrupal /> },
    { name: 'elementor', icon: <FaElementor /> },
    { name: 'framer', icon: <SiFramer /> },
    { name: 'ghost', icon: <SiGhost /> },
    { name: 'html-css-js', icon: <FaHtml5 /> },
    { name: 'next', icon: <SiNextdotjs /> },
    { name: 'react', icon: <FaReact /> },
    { name: 'webflow', icon: <SiWebflow /> },
    { name: 'wix', icon: <SiWix /> },
    { name: 'wordpress', icon: <FaWordpress /> },
  ];

  return (
    <section id='tool-step'>
      <h3>Select Tool</h3>
      <p>Select the tool or platform you used to create your site. This will help users understand the technologies involved.</p>
      <div className="tool-cards">
        {tools.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => setTool(name)}
            className={tool === name ? 'selected' : 'tool-card'}
          >
            {icon}
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
