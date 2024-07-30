import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { db } from "../../firebase/Firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import "./Home.scss";
import { Link } from "react-router-dom";
import { TbArrowNarrowRight } from "react-icons/tb";
import { RiArrowRightDownLine } from "react-icons/ri";
import { IoMdStar } from "react-icons/io";
import { AiOutlineSelect } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";


import Skeleton from "react-loading-skeleton";

const Home = () => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSites = async () => {

            try {
                setLoading(true);
                const q = query(collection(db, "sites"), limit(5), orderBy("views", "desc"));
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
                <h1>Boost your website  <img src="/world-img.jpg" alt="" /> and stand out!</h1>
                <p>Launch your website with us and gain more notoriety! Sell ​​your website faster and more easily.</p>
                <div className="home-button">
                    <Link
                        to="/sites/blog"
                        className="home-button-content"
                    >
                        Explore sites <div className="ball-button">
                            <TbArrowNarrowRight />
                        </div>
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
                            delay: 8000,
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
                                            <div className="featured">< IoMdStar /> <p>FEATURED SITE</p></div>
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

            <section id="home-sub-hero">
                <div className="left-content">
                    <div className="how-it-work">
                        <h2>How does it work?</h2>
                        <p>
                            As you might know, most streaming services recommend tracks based on what similar people are listening to. If someone similar to me listens and likes “Fred Again”, chances are I’ll be recommended “Fred Again”.
                            <br /><br />
                            That obviously works well for artists that are already being heard. But what about all of the songs that don’t have any plays yet? Well, that’s exactly the problem with most music algorithms. They simply can’t recommend tracks with zero plays. If no one has listened yet, they’ve got no signals.
                            <br /><br />
                            Our new Next Pro feature “First Fans” changes the game. Using AI, we can quickly analyze tracks and surface them to listeners who are likely to enjoy it. Even if they’re just uploaded and have zero plays.
                        </p>
                        <div className="about-button">
                            <Link
                                to="/create"
                                className="about-button-content"
                            >
                                Submit your site <div className="ball-button">
                                    <RiArrowRightDownLine />
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className="faq">
                        <h2>FAQ</h2>
                        <h3>How do I get this?</h3>
                        <p>
                            Only Next Pro Artists members have access to this premium First Fans feature.
                            Subscribe to Next Pro to enable First Fans feature.
                        </p>
                        <h3>Do all tracks qualify?</h3>
                        <p>First Fans is currently only available for music tracks which are under 10 minutes, uploaded by Next Pro subscribers.</p>
                    </div>
                </div>
                <div className="right-content">
                    <div className="card">
                        <div className="left-content">
                            <div className="icon-card">
                                <AiOutlineSelect />
                            </div>
                        </div>
                        <div className="right-content">
                            <h3>SELECT YOUR SITE</h3>
                            <p>Select your best website or template.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="left-content">
                            <div className="icon-card">
                                <FaWpforms />
                            </div>
                        </div>
                        <div className="right-content">
                            <h3>FILL OUT THE FORM AND PUBLISH</h3>
                            <p>Fill in all the information on the form and submit.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="left-content">
                            <div className="icon-card">
                                <IoTimeOutline />
                            </div>
                        </div>
                        <div className="right-content">
                            <h3>WAIT FOR YOUR WEBSITE TO BE REVIEWED</h3>
                            <p>Of course, you can skip the queue and be highlighted at the top of the page.</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Home;
