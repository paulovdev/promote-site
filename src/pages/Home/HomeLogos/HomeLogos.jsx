import React, { useState } from 'react';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';

import "./HomeLogos.scss";

const HomeLogos = () => {
    const { t } = useTranslation();
    const [selectedTool, setSelectedTool] = useState("drupal");
    const [selectedToolName, setSelectedToolName] = useState("Drupal");

    const icons = [
        { icon: <FaDrupal />, name: "Drupal", key: "drupal" },
        { icon: <FaElementor />, name: "Elementor", key: "elementor" },
        { icon: <SiFramer />, name: "Framer", key: "framer" },
        { icon: <SiGhost />, name: "Ghost", key: "ghost" },
        { icon: <SiNextdotjs />, name: "Next.js", key: "next" },
        { icon: <FaReact />, name: "React", key: "react" },
        { icon: <FaHtml5 />, name: "HTML5", key: "html" },
        { icon: <DiCss3 />, name: "CSS3", key: "css" },
        { icon: <DiJavascript1 />, name: "JavaScript", key: "js" },
        { icon: <SiWebflow />, name: "Webflow", key: "webflow" },
        { icon: <SiWix />, name: "Wix", key: "wix" },
        { icon: <FaWordpress />, name: "WordPress", key: "wordpress" },
    ];

    const handleIconClick = (key, name) => {
        setSelectedTool(key);
        setSelectedToolName(name);
    };

    return (
        <section id='home-logos'>
            <div className="text-logos">
                <span>{t('homeLogos.sectionTitle')}</span>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedTool} // A key única para cada ferramenta
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-logos"
                    >
                        <h1>{selectedToolName}</h1>
                        <p>{t(`toolDescriptions.${selectedTool}`)}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="icons">
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        onClick={() => handleIconClick(icon.key, icon.name)}
                        className={selectedTool === icon.key ? 'active' : ''}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${icon.name}`}
                    >
                        {icon.icon}
                    </div>
                ))}
            </div>
            <Tooltip id="my-tooltip" />
        </section>
    );
};

export default HomeLogos;
