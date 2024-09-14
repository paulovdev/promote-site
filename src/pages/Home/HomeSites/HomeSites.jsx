import React from 'react';
import { useSites } from '../../../hooks/useSites';
import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';

import './HomeSites.scss';

const HomeSites = () => {
  const { sites, loading, error } = useSites();
  const staggeredSites = sites.concat(sites);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="home-sites">
      <div className="swiper-container">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          loop={true}

          autoplay={{
            "delay": 1,
            "disableOnInteraction": false,
            "pauseOnMouseEnter": false,
            "stopOnLastSlide": false,
            "waitForTransition": true
          }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="loading-skeleton" />
            ))
            : staggeredSites.map((site, index) => (
              <SwiperSlide key={index} className="site-slide">
                <Link className="site-container" to={`/site/${site.id}`} onClick={() => scrollTo({ top: 0 })}>
                  <img src={site.imageURL} alt={site.siteName} width={300} height={200} />
                  <div className="view"><RiArrowRightUpLine /></div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section >
  );
};

export default HomeSites;
