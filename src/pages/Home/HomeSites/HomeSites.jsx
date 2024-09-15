import React from 'react';
import { useSites } from '../../../hooks/useSites';
import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './HomeSites.scss';

const HomeSites = () => {
  const { sites, loading, error } = useSites();
  const staggeredSites = sites.concat(sites);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="home-sites">

      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ clickable: false }}
        modules={[Autoplay]}
        breakpoints={{
          1400: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          609: {
            slidesPerView: 2,
            spaceBetween: 20,
          }


        }}
      >
        {
          loading
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

    </section >
  );
};

export default HomeSites;
