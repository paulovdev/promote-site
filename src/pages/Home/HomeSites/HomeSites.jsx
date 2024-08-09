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

  const x = useMotionValue(0); // Track horizontal position
  const { scrollY } = useScroll(); // Track vertical scroll
  const velocity = useVelocity(scrollY); // Get the velocity of the scroll

  const springX = useSpring(x, { stiffness: 500, damping: 120 }); // Smooth out the motion value

  // Transform the vertical scroll into horizontal movement
  const scrollToX = useTransform(scrollY, [0, 1000], [0, -500]);

  // Link the scroll position to the x-axis translation of the slider
  useAnimationFrame(() => {
    const moveBy = velocity.get() * 0.05; // Adjust the multiplier to control speed
    x.set(springX.get() + moveBy);
  });

  return (
    <section id="home-sites">
      <motion.div   className="slider-container"   >
        <motion.div className="slider" >
          {loading
            ? [...Array(5)].map((_, index) => (
              <motion.div className="site-slide" key={index}>
                <Link className="site-container">
                  <Skeleton width={450} height={250} />
                </Link>
              </motion.div>
            ))
            : sites.concat(sites).map((site) => (
              <motion.div className="site-slide" key={site.id} ref={sliderRef}
                style={{ x: scrollToX }}>
                <Link
                  className="site-container"
                  to={`/site/${site.id}`}
                  onClick={() => scrollTo({ top: 0 })}
                >
                  <img src={site.imageURL} alt={site.siteName} />
                  <div className="featured"><IoMdStar /></div>
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeSites;
