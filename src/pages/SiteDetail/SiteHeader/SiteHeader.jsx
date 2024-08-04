import React from 'react';
import { Link } from 'react-router-dom';
import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import "./SiteHeader.scss";

const SiteHeader = ({ site }) => {
  return (
    <section id="site-detail">
      <div className="header-text">
        <div className="title">
          <h1>{site.siteName}</h1>
          <p>
            {site.price === "free" ? "Free" : `$${site.price}`}
          </p>
        </div>

        <p>{site.description}</p>
      </div>

      <div className="sub-header-text">
        <div className="sub-text">
          <strong>Created by: </strong>
          <a href={site.profileLink} target="_blank" rel="noopener noreferrer">
            {site.myName}
          </a>
        </div>

        <div className="sub-text">
          <strong>Category: </strong>
          <Link to={`/sites/${site.category}`}>
            {site.category}
          </Link>
        </div>

        <div className="sub-text">
          <strong>Tool: </strong>
          <Link to={`/sites/${site.tool}`}>
            <span>
              {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
              {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
              {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
              {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
              {site.tool === 'html-css-js' && <FaHtml5 style={{ background: '#e34c26' }} />}
              {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
              {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
              {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
              {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
              {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
            </span>
          </Link>
        </div>

        <div className="site-buttons">
          <a href={site.livePreview} target="_blank" rel="noopener noreferrer">See this site</a>
        </div>

        <div className="site-buttons">
          <a href={site.buyLink} target="_blank" rel="noopener noreferrer">Want to buy this site?</a>
        </div>
      </div>

      <img src={site.imageURL} alt={site.siteName} />
    </section>
  );
};

export default SiteHeader;
