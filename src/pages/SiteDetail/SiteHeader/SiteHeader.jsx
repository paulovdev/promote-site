import React from 'react';
import { Link } from 'react-router-dom';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import "./SiteHeader.scss";
import { motion } from 'framer-motion';
import { DiCss3, DiJavascript1 } from 'react-icons/di';

const SiteHeader = ({ site }) => {
  return (
    <section id="site-detail">
      <div className="left-content">
        <img src={site.imageURL} alt={site.siteName} />
      </div>


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
            <Link to={`/sites/${site.category}`}>
              {site.category}
            </Link>
          </div>
        </div>

        <div className="header-text">
          <div className="title">
            <h1>{site.siteName}</h1>
            <p>
              {site.price === "free" ? "Free" : `$${site.price}`}
            </p>
          </div>

          <p>{site.description}</p>
        </div>


        <div className="sub-text">
          By
          <a href={site.profileLink} target="_blank" rel="noopener noreferrer">
            {site.myName}
          </a>
        </div>

        <div className="site-buttons">
          <motion.div
            whileHover={{ scale: 1.03, }}
            transition={{ type: "spring", stiffness: 400, damping: 8 }}
            className="site-buttons">
            <a
              href={site.livePreview}
              target="_blank"
              rel="noopener noreferrer"
            >See this site</a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, }}
            transition={{ type: "spring", stiffness: 400, damping: 8 }}
            className="site-buttons">

            <a
              href={site.buyLink}
              target="_blank"
              rel="noopener noreferrer"
            >Want to buy this site?</a>
          </motion.div>

        </div>
      </div>


    </section>
  );
};

export default SiteHeader;
