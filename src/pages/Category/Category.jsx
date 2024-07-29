import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link, NavLink } from 'react-router-dom';
import './Category.scss';
import Skeleton from 'react-loading-skeleton';

const Category = () => {
    const { category } = useParams();
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                setLoading(true);
                const q = query(collection(db, 'sites'), where('category', '==', category));
                const querySnapshot = await getDocs(q);
                const sitesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSites(sitesData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchSites();
    }, [category]);

    return (
        <>
            <section id='nav-category'>
                <nav>
                    <ul>
                        <li><NavLink to="/category/blog">Blog</NavLink></li>
                        <li><NavLink to="/category/business">Business</NavLink></li>
                        <li><NavLink to="/category/creative">Creative</NavLink></li>
                        <li><NavLink to="/category/educational">Educational</NavLink></li>
                        <li><NavLink to="/category/e-commerce">E-commerce</NavLink></li>
                        <li><NavLink to="/category/event">Event</NavLink></li>
                        <li><NavLink to="/category/health-wellness">Health & Wellness</NavLink></li>
                        <li><NavLink to="/category/landing-page">Landing Page</NavLink></li>
                        <li><NavLink to="/category/non-profit">Non-Profit</NavLink></li>
                        <li><NavLink to="/category/photography">Photography</NavLink></li>
                        <li><NavLink to="/category/portfolio">Portfolio</NavLink></li>
                        <li><NavLink to="/category/restaurant">Restaurant</NavLink></li>
                        <li><NavLink to="/category/saas">Saas</NavLink></li>
                        <li><NavLink to="/category/technology">Technology</NavLink></li>
                        <li><NavLink to="/category/travel">Travel</NavLink></li>
                    </ul>
                </nav>
            </section>

            <section id='category'>
                {loading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='skeleton-wrapper'>
                            <Skeleton height={225} width={450} />
                            <Skeleton height={20} width={`60%`} style={{ marginTop: '10px' }} />
                            <Skeleton height={15} width={`80%`} style={{ marginTop: '10px' }} />
                            <Skeleton height={15} width={`40%`} style={{ marginTop: '10px' }} />
                        </div>
                    ))
                }
                {!loading &&
                    sites.map(site => (
                        <Link to={`/site/${site.id}`} key={site.id} className='site-card'>
                            <img src={site.imageURL} alt={site.siteName} />
                            <h1>{site.siteName}</h1>
                            <p>{site.description}</p>
                            <p>Created by: {site.myName}</p>
                        </Link>
                    ))
                }
            </section>
        </>
    );
};

export default Category;
