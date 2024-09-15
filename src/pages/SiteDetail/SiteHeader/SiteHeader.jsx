import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';

import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

import "./SiteHeader.scss";

const SiteHeader = ({ site }) => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(null);

  const toggleFAQ = (index) => {
    setSelected(selected === index ? null : index);
  };

  const faqs = t('siteHeader.faqs.questions', { returnObjects: true });
  const toolDescriptions = t('siteHeader.toolDescriptions', { returnObjects: true });
  const currentDescription = i18n.language === 'en' ? site.descriptionEn : site.descriptionBr;

  const categories = [
    { name: t('categories.all'), path: "/sites/all" },
    { name: t('categories.featured'), path: "/sites/hot" },
    { name: t('categories.blog'), path: "/sites/blog" },
    { name: t('categories.business'), path: "/sites/business" },
    { name: t('categories.creative'), path: "/sites/creative" },
    { name: t('categories.educational'), path: "/sites/educational" },
    { name: t('categories.ecommerce'), path: "/sites/e-commerce" },
    { name: t('categories.event'), path: "/sites/event" },
    { name: t('categories.health'), path: "/sites/health-wellness" },
    { name: t('categories.landingPage'), path: "/sites/landing-page" },
    { name: t('categories.nonProfit'), path: "/sites/non-profit" },
    { name: t('categories.photography'), path: "/sites/photography" },
    { name: t('categories.portfolio'), path: "/sites/portfolio" },
    { name: t('categories.restaurant'), path: "/sites/restaurant" },
    { name: t('categories.saas'), path: "/sites/saas" },
    { name: t('categories.technology'), path: "/sites/technology" },
    { name: t('categories.travel'), path: "/sites/travel" }
  ];
  const currentCategory = categories.find(cat => cat.path === `/sites/${site.category}`)?.name;


  return (
    <>
      <section id="site-detail">
        <div className="top-nav">
          <Link to={"/"}>
            {t('siteHeader.breadcrumb.home')}
          </Link>
          <MdKeyboardArrowRight />
          <Link to={`/sites/${site.category}`}>
            {currentCategory}
          </Link>
          <MdKeyboardArrowRight />
          <Link>
            {site.siteName}
          </Link>
        </div>
        <div className="site-detail-container">
          <div className="right-content">
            <div className="site-top-text">
              <div className="tool-text">
                <Link to={`/sites/${site.tool}`}>
                  <span>
                    {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                    {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                    {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                    {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                    {site.tool === 'html-css-js' && <>
                      <FaHtml5 style={{ background: '#e34c26' }} />
                      <DiCss3 style={{ background: '#264de4' }} />
                      <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                    </>}
                    {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                    {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                    {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                    {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                    {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                  </span>
                </Link>
              </div>

              <div className="category-text">
                <Link to={`/sites/${site.category}`} data-tooltip-id="my-tooltip" data-tooltip-content={t('siteHeader.toolText.tooltip', { category: site.category })}>
                  {currentCategory}
                </Link>
              </div>
            </div>

            <div className="header-text">
              <div className="title">
                <h1>{site.siteName}</h1>
                <p>{currentDescription}</p>
              </div>
            </div>

            <div className="sub-text">
              {t('siteHeader.siteDetails.madeBy')}
              <a href={site.profileLink} target="_blank" rel="noopener noreferrer">
                {site.myName}
              </a>
            </div>

            <div className="site-buttons">
              <a
                href={site.livePreview}
                className="site-button"
                target="_blank"
                rel="noopener noreferrer"
              >{t('siteHeader.siteDetails.viewSite')}</a>

              <a
                href={site.buyLink}
                className="site-button-2"
                target="_blank"
                rel="noopener noreferrer"
              >{t('siteHeader.siteDetails.buySite', { price: site.price === 0 ? `${t('siteHeader.siteDetails.freePrice')}` : `$${site.price}` })}</a>
            </div>
          </div>

          <div className="left-content">
            <img src={site.imageURL} alt={site.siteName} />
            {site.hot === 1 ? <p>{t("siteHeader.featured")}</p> : ""}
          </div>
        </div>

        <Tooltip id="my-tooltip" />
      </section>

      <section id='site-features'>
        <div className="features">
          <span>{t('siteHeader.features.title')}</span>
          <h1>{t('siteHeader.features.subtitle')}:</h1>
          <ul>
            {i18n.language === 'en'
              ? site.featureEn.map((feature, index) => (
                <li key={index}>
                  <h2>- {feature}</h2>
                </li>
              ))
              : site.featureBr.map((feature, index) => (
                <li key={index}>
                  <h2>- {feature}</h2>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section id='site-made'>
        <div className="card">
          <div className="tool-text">
            <span>
              {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
              {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
              {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
              {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
              {site.tool === 'html-css-js' && <>
                <FaHtml5 style={{ background: '#e34c26' }} />
                <DiCss3 style={{ background: '#264de4' }} />
                <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
              </>}
              {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
              {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
              {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
              {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
              {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
            </span>
          </div>
          <h1>{t(`siteHeader.toolDescriptions.madeWith`)} <span>{site.tool}</span></h1>
          <p>{t(`siteHeader.toolDescriptions.${site.tool}`)}</p>
        </div>
        <div className="card">
          <div className="tool-text">
            <span>
              {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
              {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
              {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
              {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
              {site.tool === 'html-css-js' && <>
                <FaHtml5 style={{ background: '#e34c26' }} />
                <DiCss3 style={{ background: '#264de4' }} />
                <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
              </>}
              {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
              {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
              {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
              {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
              {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
            </span>
          </div>
          <h1>{t(`siteHeader.toolDescriptions.madeWith`)} <span>{site.tool}</span></h1>
          <p>{t(`siteHeader.toolDescriptions.${site.tool}`)}</p>
        </div>
        <div className="card">
          <div className="tool-text">
            <span>
              {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
              {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
              {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
              {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
              {site.tool === 'html-css-js' && <>
                <FaHtml5 style={{ background: '#e34c26' }} />
                <DiCss3 style={{ background: '#264de4' }} />
                <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
              </>}
              {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
              {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
              {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
              {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
              {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
            </span>
          </div>
          <h1>{t(`siteHeader.toolDescriptions.madeWith`)} <span>{site.tool}</span></h1>
          <p>{t(`siteHeader.toolDescriptions.${site.tool}`)}</p>
        </div>
      </section>

      <section id='site-faqs'>
        <span>{t('siteHeader.faqs.title')}</span>
        <h1>{t('siteHeader.faqs.subtitle')}</h1>
        <div className="faqs">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-card"
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-header">
                <h3>{faq.question}</h3>
                {selected === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              <AnimatePresence>
                {selected === index && (
                  <motion.div
                    className="faq-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SiteHeader;
