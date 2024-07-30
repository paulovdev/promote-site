import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { db } from "../../firebase/Firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import "./Home.scss";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const Home = () => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    useEffect(() => {
        const fetchSites = async () => {

            try {
                setLoading(true);
                // Create a query to fetch sites sorted by views in descending order
                const q = query(collection(db, "sites"), orderBy("views", "desc"));
                const querySnapshot = await getDocs(q);
                const sitesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSites(sitesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sites: ", error);
            }
        };

        fetchSites();
    }, []);

    return (
        <>
            <section id="home-hero">
                <h1>Discover the latest <img src="/world-img.jpg" alt="" /> sites & resources.</h1>
                <p>Launch your <span>website</span> in minutes with the latest sites & resources created by the community.</p>
                <div className="home-buttons">
                    <Link
                        to="/sites/blog"
                        className={`home-button-1 ${hoveredButton === 'button1' ? 'hovered' : ''} ${hoveredButton === 'button2' ? 'other-hovered' : ''}`}
                        onMouseEnter={() => setHoveredButton('button1')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Explore sites
                    </Link>
                    <Link
                        to="/create"
                        className={`home-button-2 ${hoveredButton === 'button2' ? 'hovered' : ''} ${hoveredButton === 'button1' ? 'other-hovered' : ''}`}
                        onMouseEnter={() => setHoveredButton('button2')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Submit your site
                    </Link>
                </div>
            </section>

            {loading &&
                <section id="home-sites">
                    <div
                        className="popular-site-slides"
                    >
                        <Link >
                            <div className="site-container">
                                <div className="site-left-content">
                                    <Skeleton width={900} height={500} />
                                </div>

                                <div className="site-right-content">
                                    <Skeleton width={75} height={15} />
                                    <Skeleton width={250} height={30} />
                                    <Skeleton width={450} height={10} />
                                    <Skeleton width={350} height={10} />
                                    <Skeleton width={200} height={12} />
                                </div>
                            </div>
                        </Link>

                    </div>

                    <Skeleton width={80} height={10} />
                </section>
            }
            {!loading &&
                <section id="home-sites">
                    <Swiper
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={1}
                        spaceBetween={10}
                        className="popular-site-slides"
                    >
                        {sites.map(site => (
                            <SwiperSlide key={site.id}>
                                <Link to={`/site/${site.id}`}>
                                    <div className="site-container">

                                        <div className="site-left-content">
                                            <img src={site.imageURL} alt={site.siteName} />
                                        </div>

                                        <div className="site-right-content">
                                            <span>{site.category} | {site.tool}</span>
                                            <h1>{site.siteName}</h1>
                                            <p>{site.description}</p>
                                            <p>Created by: {site.myName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            }

            <section id="home-about">
                <p>
                    <span>SitePromote.</span> is an intuitive and powerful platform designed for writers of all levels. Our application allows you to create, edit, and publish your texts with ease. Whether you are a blogger, journalist, writer, or just someone with a story to tell, SitePromote is the perfect place to share your ideas with the world.
                </p>
            </section>
        </>
    );
};

export default Home;
