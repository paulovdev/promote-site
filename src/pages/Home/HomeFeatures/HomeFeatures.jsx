import React from "react";

import { CiFileOn } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { PiHandTapThin } from "react-icons/pi";
import { MdOutlineDone } from "react-icons/md";

import { useTranslation } from "react-i18next";
import "./HomeFeatures.scss";

const HomeFeatures = () => {
    const { t } = useTranslation();

    const features = t('homeFeatures.features', { returnObjects: true });

    return (
        <section id="home-features">
            <span>{t('homeFeatures.sectionTitle')}</span>
            <h1>{t('homeFeatures.sectionSubtitle')}</h1>
            <div className="features-content">
                {features.map((feature, index) => (
                    <div className="card" key={index}>
                        <div className="icon-card">
                            {index === 0 && <PiHandTapThin />}
                            {index === 1 && <CiFileOn />}
                            {index === 2 && <CiClock1 />}
                            {index === 3 && <MdOutlineDone />}
                        </div>
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
