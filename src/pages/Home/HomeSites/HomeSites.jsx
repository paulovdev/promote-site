import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { IoMdStar } from 'react-icons/io';
import { useSites } from '../../../context/SitesHomeContext';
import './HomeSites.scss';

const HomeSites = () => {
  const { sites, loading } = useSites();

  if (loading) {
    return (
      <section id="home-sites">
        <div className="slider-container">
          <div className="slider">
            {[...Array(5)].map((_, index) => (
              <div className="site-slide" key={index}>
                <Link className="site-container">
                  <Skeleton width={450} height={250} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home-sites">
      <div className="slider-container">
        <div className="slider">
          {sites.concat(sites).map((site) => (
            <div className="site-slide" key={site.id}>
              <Link className="site-container" to={`/site/${site.id}`} onClick={() => scrollTo({ top: 0 })}>
                <img src={site.imageURL} alt={site.siteName} />
                <div className="featured"><IoMdStar /></div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSites;
