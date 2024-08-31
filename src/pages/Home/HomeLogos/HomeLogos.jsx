import React from 'react';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';

import { Tooltip } from 'react-tooltip'

import "./HomeLogos.scss";

const HomeLogos = () => {
    const icons = [
        { icon: <FaDrupal />, name: "Drupal" },
        { icon: <FaElementor />, name: "Elementor" },
        { icon: <SiFramer />, name: "Framer" },
        { icon: <SiGhost />, name: "Ghost" },
        { icon: <SiNextdotjs />, name: "Next.js" },
        { icon: <FaReact />, name: "React" },
        { icon: <FaHtml5 />, name: "HTML5" },
        { icon: <DiCss3 />, name: "CSS3" },
        { icon: <DiJavascript1 />, name: "JavaScript" },
        { icon: <SiWebflow />, name: "Webflow" },
        { icon: <SiWix />, name: "Wix" },
        { icon: <FaWordpress />, name: "WordPress" },
    ];


    return (
        <section id='home-logos'>
            <span>Exiba seus templates em diversas tecnologias</span>
            <h1>Você pode ter em todos os template</h1>
            <div className="icons">
                {icons.map((icon, index) => (
                    <div key={index} data-tooltip-id="my-tooltip" data-tooltip-content={`${icon.name}`}>{icon.icon}</div>
                ))}
            </div>

            <Tooltip id="my-tooltip" />
        </section>
    );
}

export default HomeLogos;
