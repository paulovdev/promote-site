import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SiteDetailSkeleton = () => {
    return (
        <section id="site-detail">
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
                <Skeleton width={900} height={450} borderRadius={5} />
            </div>


        </section>
    );
};

export default SiteDetailSkeleton;
