import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SiteDetailSkeleton = () => {
    return (
        <>
            <section id="site-detail">
                <div className="top-nav">

                </div>
                <div className="site-detail-container">
                    <div className="right-content">

                        <div className="site-top-text">
                            <div className="tool-text">
                                <Skeleton width={40} height={40} borderRadius={100} />
                            </div>

                            <div className="category-text">
                                <Skeleton width={100} height={10} borderRadius={5} />
                            </div>
                        </div>

                        <div className="header-text">
                            <div className="title">
                                <Skeleton width={300} height={30} borderRadius={5} />
                                <Skeleton width={500} height={8} borderRadius={5} />
                                <Skeleton width={500} height={8} borderRadius={5} />
                            </div>


                            <Skeleton width={50} height={30} borderRadius={10} />
                        </div>

                        <div className="sub-text">
                            <Skeleton width={150} height={10} borderRadius={10} />
                        </div>

                        <div className="site-buttons">
                            <Skeleton width={120} height={40} borderRadius={40} />
                            <Skeleton width={190} height={40} borderRadius={40} />

                        </div>
                    </div>

                    <div className="left-content">
                        <Skeleton width={900} height={350} borderRadius={5} />
                    </div>
                </div>

            </section>

            <section id='site-features'>
                <div className="features">
                    <span>FEATURES DO TEMPLATE</span>
                    <h1>Este template contém as seguintes features</h1>
                    <ul>
                        <li><h2><Skeleton width={600} height={10} borderRadius={5} /></h2></li>
                        <li><h2><Skeleton width={600} height={10} borderRadius={5} /></h2></li>
                        <li><h2><Skeleton width={600} height={10} borderRadius={5} /></h2></li>
                        <li><h2><Skeleton width={600} height={10} borderRadius={5} /></h2></li>
                        <li><h2><Skeleton width={600} height={10} borderRadius={5} /></h2></li>
                        <li><h2><Skeleton width={600} height={10} borderRadius={5} /></h2></li>
                    </ul>
                </div>
            </section>

            <section id='site-faqs'>
                <span>DÚVIDAS COMUNS SOBRE TEMPLATES</span>
                <h1>Esclareça suas dúvidas sobre o template</h1>
                <div className="faqs">
                    <div className="faq-card">
                        <Skeleton width={`100%`} height={20} borderRadius={5} />
                        <br />
                        <Skeleton width={`100%`} height={20} borderRadius={5} />
                        <br />
                        <Skeleton width={`100%`} height={20} borderRadius={5} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SiteDetailSkeleton;
