import React from 'react';
import { useSites } from '../../../hooks/useSites';
import { Link } from 'react-router-dom';

import { RiArrowRightUpLine } from "react-icons/ri";

import './HomeSites.scss';

const HomeSites = () => {
  const { sites, loading, error } = useSites();
  const staggeredSites = sites.concat(sites);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="home-sites">
      <div className="slider-container">
        <div className="slider">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="loading-skeleton" />
            ))
            : staggeredSites.map((site, index) => (
              <div className="site-slide" key={index}>
                <Link className="site-container" to={`/site/${site.id}`}>
                  <img src={site.imageURL} alt={site.siteName} />

                  <div className="view"><RiArrowRightUpLine /></div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSites;





{/*                  <div className="featured">
                    <p>
                      Em destaque
                    </p>
                  </div>  */}