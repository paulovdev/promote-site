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

    // Map URL category values to display names
    const categoryDisplayNames = {
        'blog': 'Blog',
        'business': 'Business',
        'creative': 'Creative',
        'educational': 'Educational',
        'e-commerce': 'E-commerce',
        'event': 'Event',
        'health-wellness': 'Health & Wellness',
        'landing-page': 'Landing Page',
        'non-profit': 'Non-Profit',
        'photography': 'Photography',
        'portfolio': 'Portfolio',
        'restaurant': 'Restaurant',
        'saas': 'Saas',
        'technology': 'Technology',
        'travel': 'Travel',
        'elementor': 'Elementor',
        'framer': 'Framer',
        'ghost': 'Ghost',
        'html-css-js': 'HTML + CSS + JS',
        'next': 'Next',
        'react': 'React',
        'webflow': 'Webflow',
        'wix': 'Wix',
        'wordpress': 'WordPress'
    };

    const displayCategoryName = categoryDisplayNames[category] || category;

    useEffect(() => {
        const fetchSites = async () => {
            try {
                setLoading(true);
                const categoryQuery = query(collection(db, 'sites'), where('category', '==', category));
                const toolQuery = query(collection(db, 'sites'), where('tool', '==', category));
                const categorySnapshot = await getDocs(categoryQuery);
                const toolSnapshot = await getDocs(toolQuery);
                const categorySites = categorySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const toolSites = toolSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const combinedSites = [...categorySites, ...toolSites];
                const uniqueSites = Array.from(new Set(combinedSites.map(site => site.id)))
                    .map(id => {
                        return combinedSites.find(site => site.id === id);
                    });
                setSites(uniqueSites);
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
                        <li><NavLink to="/sites/blog">Blog</NavLink></li>
                        <li><NavLink to="/sites/business">Business</NavLink></li>
                        <li><NavLink to="/sites/creative">Creative</NavLink></li>
                        <li><NavLink to="/sites/educational">Educational</NavLink></li>
                        <li><NavLink to="/sites/e-commerce">E-commerce</NavLink></li>
                        <li><NavLink to="/sites/event">Event</NavLink></li>
                        <li><NavLink to="/sites/health-wellness">Health & Wellness</NavLink></li>
                        <li><NavLink to="/sites/landing-page">Landing Page</NavLink></li>
                        <li><NavLink to="/sites/non-profit">Non-Profit</NavLink></li>
                        <li><NavLink to="/sites/photography">Photography</NavLink></li>
                        <li><NavLink to="/sites/portfolio">Portfolio</NavLink></li>
                        <li><NavLink to="/sites/restaurant">Restaurant</NavLink></li>
                        <li><NavLink to="/sites/saas">Saas</NavLink></li>
                        <li><NavLink to="/sites/technology">Technology</NavLink></li>
                        <li><NavLink to="/sites/travel">Travel</NavLink></li>
                        {/* ... */}
                        <li><NavLink to="/sites/elementor">Elementor</NavLink></li>
                        <li><NavLink to="/sites/framer">Framer</NavLink></li>
                        <li><NavLink to="/sites/ghost">Ghost</NavLink></li>
                        <li><NavLink to="/sites/html-css-js">HTML + CSS + JS</NavLink></li>
                        <li><NavLink to="/sites/next">Next</NavLink></li>
                        <li><NavLink to="/sites/react">React</NavLink></li>
                        <li><NavLink to="/sites/webflow">Webflow</NavLink></li>
                        <li><NavLink to="/sites/wix">Wix</NavLink></li>
                        <li><NavLink to="/sites/wordpress">WordPress</NavLink></li>
                    </ul>
                </nav>
            </section>

            <section id='category'>
                <h1>Explore in the {displayCategoryName} and search the best site for you!</h1>
                {loading &&
                    Array.from({ length: 6 }).map((_, index) => (
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
                            <span>{site.category} | {site.tool}</span>
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
