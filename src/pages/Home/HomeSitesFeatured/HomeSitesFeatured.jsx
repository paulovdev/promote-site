import React from 'react';
import { useSites } from '../../../hooks/useSites';
import { Link } from 'react-router-dom';

import { RiArrowRightUpLine } from "react-icons/ri";

import './HomeSitesFeatured.scss';
import { useTranslation } from 'react-i18next';

const HomeSitesFeatured = () => {
  const { sites, loading, error } = useSites();
  const { t } = useTranslation();
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="home-sites-featured">
      <h1>{t('HomeSitesFeatured.sectionTitle')}</h1>
      <div className="site-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="loading-skeleton" />
          ))
          : sites.map((site, index) => (
            <Link className="site-container" key={index} to={`/site/${site.id}`} onClick={() => scrollTo({ top: 0 })}>
              <img src={site.imageURL} alt={site.siteName} width={300} height={200} />
              <div className="view"><RiArrowRightUpLine /></div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default HomeSitesFeatured;