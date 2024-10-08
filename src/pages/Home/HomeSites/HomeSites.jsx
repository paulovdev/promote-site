import React from 'react';
import { useSites } from '../../../hooks/useSites';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FaDrupal, FaElementor, FaReact, FaWordpress, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiGhost, SiWebflow, SiWix } from 'react-icons/si';
import { DiCss3, DiJavascript1 } from 'react-icons/di';

import './HomeSites.scss';


const HomeSites = () => {
  const { t } = useTranslation();
  const { sites, loading, error } = useSites();

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  return (
    <section id="home-sites">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="loading-skeleton" />
        ))
      ) : (
        sites.map((site, index) => {
          const currentCategory = categories.find(cat => cat.path === `/sites/${site.category}`)?.name;

          return (
            <>
              <Link className="site-container" to={`/site/${site.id}`} key={index} onClick={() => scrollTo({ top: 0 })}>
                <img src={site.imageURL1} alt={site.siteName} width={300} height={200} />
                <div className="text-card">
                  <span>
                    {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                    {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                    {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                    {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                    {site.tool === 'html-css-js' && (
                      <>
                        <FaHtml5 style={{ background: '#e34c26' }} />
                        <DiCss3 style={{ background: '#264de4' }} />
                        <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                      </>
                    )}
                    {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                    {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                    {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                    {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                    {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                  </span>

                  <div className="title-text">
                    <h1>{site.siteName}</h1>
                    <p>•</p>
                    <p>{currentCategory}</p>
                  </div>
                </div>
              </Link>

              <Link className="site-container" to={`/site/${site.id}`} key={index} onClick={() => scrollTo({ top: 0 })}>
                <img src={site.imageURL1} alt={site.siteName} width={300} height={200} />
                <div className="text-card">
                  <span>
                    {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                    {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                    {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                    {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                    {site.tool === 'html-css-js' && (
                      <>
                        <FaHtml5 style={{ background: '#e34c26' }} />
                        <DiCss3 style={{ background: '#264de4' }} />
                        <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                      </>
                    )}
                    {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                    {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                    {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                    {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                    {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                  </span>

                  <div className="title-text">
                    <h1>{site.siteName}</h1>
                    <p>•</p>
                    <p>{currentCategory}</p>
                  </div>
                </div>
              </Link>

              <Link className="site-container" to={`/site/${site.id}`} key={index} onClick={() => scrollTo({ top: 0 })}>
                <img src={site.imageURL1} alt={site.siteName} width={300} height={200} />
                <div className="text-card">
                  <span>
                    {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                    {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                    {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                    {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                    {site.tool === 'html-css-js' && (
                      <>
                        <FaHtml5 style={{ background: '#e34c26' }} />
                        <DiCss3 style={{ background: '#264de4' }} />
                        <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                      </>
                    )}
                    {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                    {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                    {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                    {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                    {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                  </span>

                  <div className="title-text">
                    <h1>{site.siteName}</h1>
                    <p>•</p>
                    <p>{currentCategory}</p>
                  </div>
                </div>
              </Link>

              <Link className="site-container" to={`/site/${site.id}`} key={index} onClick={() => scrollTo({ top: 0 })}>
                <img src={site.imageURL1} alt={site.siteName} width={300} height={200} />
                <div className="text-card">
                  <span>
                    {site.tool === 'drupal' && <FaDrupal style={{ background: '#00598e' }} />}
                    {site.tool === 'elementor' && <FaElementor style={{ background: '#ea4c89' }} />}
                    {site.tool === 'framer' && <SiFramer style={{ background: '#0055ff' }} />}
                    {site.tool === 'ghost' && <SiGhost style={{ background: '#212121' }} />}
                    {site.tool === 'html-css-js' && (
                      <>
                        <FaHtml5 style={{ background: '#e34c26' }} />
                        <DiCss3 style={{ background: '#264de4' }} />
                        <DiJavascript1 style={{ background: '#f7df1e', color: '#000' }} />
                      </>
                    )}
                    {site.tool === 'next' && <SiNextdotjs style={{ background: '#000000' }} />}
                    {site.tool === 'react' && <FaReact style={{ background: '#00d9ff' }} />}
                    {site.tool === 'webflow' && <SiWebflow style={{ background: '#4353ff' }} />}
                    {site.tool === 'wix' && <SiWix style={{ background: '#0c6ebd' }} />}
                    {site.tool === 'wordpress' && <FaWordpress style={{ background: '#21759b' }} />}
                  </span>

                  <div className="title-text">
                    <h1>{site.siteName}</h1>
                    <p>•</p>
                    <p>{currentCategory}</p>
                  </div>
                </div>
              </Link>
            </>
          );
        })
      )}
    </section>
  );
};

export default HomeSites;
