import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';

import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

import { Tooltip } from 'react-tooltip'

import "./SiteHeader.scss";

const SiteHeader = ({ site }) => {
  const [selected, setSelected] = useState(null);

  const toggleFAQ = (index) => {
    setSelected(selected === index ? null : index);
  };

  const faqs = [
    {
      question: "O que é este template?",
      answer: "Este template é uma plataforma onde você pode visualizar e comprar modelos de templates criados com diferentes ferramentas."
    },
    {
      question: "Como posso comprar um template?",
      answer: "Para comprar um template, clique no botão 'Comprar este template' e você será redirecionado para a página de compra."
    },
    {
      question: "Quais são as ferramentas utilizadas?",
      answer: "Os templates disponíveis aqui são feitos com ferramentas como Drupal, Elementor, Framer, Ghost, HTML/CSS/JS, Next.js, React, Webflow, Wix, e WordPress."
    },
  ];

  return (<>
    <section id="site-detail">
      <div className="top-nav">
        <Link to={"/"}>
          Página Inicial
        </Link>
        <MdKeyboardArrowRight />
        <Link to={`/sites/${site.category}`}>
          {site.category}
        </Link>
        <MdKeyboardArrowRight />
        <Link >
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
              <Link to={`/sites/${site.category}`} data-tooltip-id="my-tooltip" data-tooltip-content={`Veja mais de ${site.category}`}>
                {site.category}

              </Link>
            </div>
          </div>

          <div className="header-text">
            <div className="title">
              <h1>{site.siteName}</h1>
              <p>{site.description}</p>
            </div>
          </div>

          <div className="sub-text">
            Feito por
            <a href={site.profileLink} target="_blank" rel="noopener noreferrer">
              {site.myName}
            </a>
          </div>

          <div className="site-buttons">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 8 }}
              className="site-buttons">
              <a
                href={site.livePreview}
                target="_blank"
                rel="noopener noreferrer"
              >Veja este site</a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 8 }}
              className="site-buttons">

              <a
                href={site.buyLink}
                target="_blank"
                rel="noopener noreferrer"
              >Comprar este site?  {site.price === "free" ? "Grátis" : `R$${site.price}`}</a>
            </motion.div>

          </div>
        </div>

        <div className="left-content">
          <img src={site.imageURL} alt={site.siteName} />
          {site.hot === 1 ? <p>Em destaque</p> : ""}
        </div>
      </div>

      <Tooltip id="my-tooltip" />
    </section>

    <section id='site-features'>
      <div className="features">
        <span>FEATURES DO TEMPLATE</span>
        <h1>Este template contém as seguintes features</h1>
        <ul>
          {site.features && <>
            <li><h2>{site.features[1]}</h2></li>
            <li><h2>{site.features[2]}</h2></li>
            <li><h2>{site.features[3]}</h2></li>
            <li><h2>{site.features[4]}</h2></li>
            <li><h2>{site.features[5]}</h2></li>
            <li><h2>{site.features[6]}</h2></li>
            <li><h2>{site.features[7]}</h2></li>
          </>
          }
        </ul>
      </div>
    </section>

    <section id='site-faqs'>
      <span>DÚVIDAS COMUNS SOBRE TEMPLATES</span>
      <h1>Esclareça suas dúvidas sobre o template</h1>
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