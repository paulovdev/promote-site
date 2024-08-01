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
                <h1>Sell your website <img src="/world-img.jpg" alt="" /> and get noticed!</h1>
                <p>Launch your website on Quimplo and gain visibility! Sell your site faster and easier.</p>
                <div className="home-button">
                    <Link
                        to="/sites/blog"
                        className="home-button-content"
                    >
                        Explore websites <div className="ball-button">
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
                                            <div className="featured"><IoMdStar /> <p>FEATURED SITE</p></div>
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

            <section id="home-features">
                <h1>How does Quimplo work?</h1>
                <div className="features-content">
                    <div className="card">
                        <div className="icon-card">
                            <AiOutlineSelect />
                        </div>
                        <h3>Select your site</h3>
                        <p>Choose the best website or template you want to sell.</p>
                    </div>

                    <div className="card">
                        <div className="icon-card">
                            <FaWpforms />
                        </div>
                        <h3>Fill out the form and publish</h3>
                        <p>Complete all the necessary information and submit your site for review.</p>
                    </div>

                    <div className="card">
                        <div className="icon-card">
                            <IoTimeOutline />
                        </div>
                        <h3>Wait for review</h3>
                        <p>Once submitted, your website will be reviewed. You can also opt for a featured listing to get highlighted at the top.</p>
                    </div>
                </div>
            </section>

            <section id="home-benefits">
                <h1>Why choose Quimplo?</h1>
                <div className="benefits-content">
                    <div className="benefit-card">
                        <h3>Optimized for SEO</h3>
                        <p>Your listings are optimized for search engines, ensuring maximum visibility.</p>
                    </div>

                    <div className="benefit-card">
                        <h3>Easy to Use</h3>
                        <p>Our platform is designed to be user-friendly, making the listing process simple and efficient.</p>
                    </div>

                    <div className="benefit-card">
                        <h3>Secure Transactions</h3>
                        <p>All transactions on Quimplo are secure, giving you peace of mind while you sell.</p>
                    </div>
                </div>
            </section>

            <section id="home-testimonials">
                <h1>What our users say</h1>
                <Swiper
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={3}
                    spaceBetween={50}
                    className="testimonials-slides"
                >
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <img src="/world-img.jpg" alt="" />
                            <p>"Quimplo has completely transformed the way I sell websites. The exposure and speed of sales are unmatched!"</p>
                            <h3>- Jane Doe, Web Designer</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card"> <img src="/world-img.jpg" alt="" />
                            <p>"The best platform for selling templates! Easy to use and gets my work in front of the right audience."</p>
                            <h3>- John Smith, Developer</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card"> <img src="/world-img.jpg" alt="" />
                            <p>"I love the featured listing option. It gave my site the boost it needed to stand out."</p>
                            <h3>- Mary Johnson, Freelancer</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card"> <img src="/world-img.jpg" alt="" />
                            <p>"I love the featured listing option. It gave my site the boost it needed to stand out."</p>
                            <h3>- Mary Johnson, Freelancer</h3>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>



            <section id="home-faqs">
                <div className="left-content">
                    <h2>What is Quimplo?</h2>
                </div>

                <div className="right-content">
                    <p>
                        Quimplo is a marketplace designed to help developers and designers sell their websites and templates. We focus on helping you gain visibility and accelerate your sales process.
                        <br /><br />
                        Our platform is optimized for SEO and performance, ensuring that your listings get the attention they deserve. Whether you're a freelancer or a design agency, Quimplo is here to help you reach your audience faster and more efficiently.
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
            </section>

            <section id="home-faqs">
                <div className="left-content">
                    <h2>Frequently Asked Questions</h2>
                </div>

                <div className="right-content">
                    <h3>How do I list my site?</h3>
                    <p>
                        Simply sign up, complete the listing form, and submit your site for review. Once approved, it will go live on our platform.
                    </p>
                    <h3>Can I feature my site?</h3>
                    <p>Yes, you can choose to have your site featured at the top of relevant categories to gain more visibility.</p>
                </div>
            </section>
        </>
    );
};

export default Home;
