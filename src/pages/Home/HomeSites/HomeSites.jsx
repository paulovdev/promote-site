import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { IoMdStar } from 'react-icons/io';
import { useSites } from '../../../context/SitesHomeContext';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import './HomeSites.scss';

const HomeSites = () => {
  const { sites, loading } = useSites();
  const sliderRef = useRef(null);

  // Motion values and transformations for the first slider (moving to the left)
  const x1 = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity1 = useVelocity(scrollY);
  const springX1 = useSpring(x1, { stiffness: 500, damping: 5 });
  const scrollToX1 = useTransform(scrollY, [0, 1500], [0, -500]);

  useAnimationFrame(() => {
    const moveBy1 = velocity1.get() * 0.10;
    x1.set(springX1.get() + moveBy1);
  });

  // Motion values and transformations for the second slider (moving to the right)
  const x2 = useMotionValue(0);
  const velocity2 = useVelocity(scrollY);
  const springX2 = useSpring(x2, { stiffness: 500, damping: 5 });
  const scrollToX2 = useTransform(scrollY, [0, 1500], [0, 500]); // Note the positive value

  useAnimationFrame(() => {
    const moveBy2 = velocity2.get() * 0.10;
    x2.set(springX2.get() + moveBy2);
  });

  // Common component for loading state
  const LoadingSkeleton = () => (
    <motion.div className="site-slide">
      <Link className="site-container">
        <Skeleton width={450} height={250} />
      </Link>
    </motion.div>
  );

  // Common component for site slide
  const SiteSlide = ({ site, x }) => (
    <motion.div className="site-slide" key={site.id} ref={sliderRef} style={{ x }}>
      <Link
        className="site-container"
        to={`/site/${site.id}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <img src={site.imageURL} alt={site.siteName} />
        <div className="featured"><IoMdStar /></div>
      </Link>
    </motion.div>
  );

  return (
    <section id="home-sites">
      <motion.div className="slider-container">
        <motion.div className="slider">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => <LoadingSkeleton key={index} />)
            : sites.concat(sites).map(site => (
              <SiteSlide key={site.id} site={site} x={scrollToX1} />
            ))}
        </motion.div>
        <motion.div className="slider">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => <LoadingSkeleton key={index} />)
            : sites.concat(sites).map(site => (
              <SiteSlide key={site.id} site={site} x={scrollToX2} />
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeSites;
