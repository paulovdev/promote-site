import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/Firebase';
import { doc, getDoc, collection, query, where, limit, getDocs, updateDoc, increment } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import './SiteDetail.scss';

const SiteDetail = () => {
    const { id } = useParams();
    const [site, setSite] = useState(null);
    const [relatedSites, setRelatedSites] = useState([]);

    useEffect(() => {
        const fetchSite = async () => {
            const docRef = doc(db, 'sites', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const siteData = docSnap.data();
                setSite(siteData);

                await updateDoc(docRef, {
                    views: increment(5)
                });

                const q = query(
                    collection(db, 'sites'),
                    where('category', '==', siteData.category),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                const relatedSitesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRelatedSites(relatedSitesData);
            } else {
                console.error('No such document!');
            }
        };

        fetchSite();
    }, [id]);

    if (!site) return <p>Loading...</p>;

    return (
        <>
            <section id="site-detail">
                <div className="header-text">
                    <h1>{site.siteName}</h1>
                    <p>{site.description}</p>
                </div>

                <div className="sub-header-text">
                    <div className="sub-text">
                        <strong>Created by: </strong>
                        <a href={site.profileLink} target="_blank" rel="noopener noreferrer">
                            {site.myName}
                        </a>
                    </div>

                    <div className="sub-text">
                        <strong>Category: </strong>
                        <Link to={`/sites/${site.category}`}>
                            {site.category}
                        </Link>
                    </div>

                    <div className="sub-text">
                        <strong>Tool: </strong>
                        <Link to={`/sites/${site.tool}`}>
                            {site.tool}
                        </Link>
                    </div>


                    <div className="site-buttons">
                        <a href={site.livePreview} target="_blank" rel="noopener noreferrer">See this site</a>
                    </div>

                    <div className="site-buttons">
                        <a href={site.buyLink} target="_blank" rel="noopener noreferrer">Want to buy this site?</a>
                    </div>
                </div>

                <img src={site.imageURL} alt={site.siteName} />
            </section>

            <section id='site-more-category'>
                <div className="sub-header-text">
                    <h2>More from <strong>{site.category}</strong></h2>
                    <Link to={`/sites/${site.category}`}>View all <FaArrowRightLong /></Link>
                </div>

                <div className="related-sites">
                    {relatedSites.map(relatedSite => (
                        <div key={relatedSite.id} className="related-site">
                            <Link to={`/site/${relatedSite.id}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
                                <img src={relatedSite.imageURL} alt={relatedSite.siteName} />
                                <span>{site.category} | {site.tool}</span>
                                <h1>{relatedSite.siteName}</h1>
                                <p>{relatedSite.description}</p>
                                <p>Created by: {relatedSite.myName}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default SiteDetail;
