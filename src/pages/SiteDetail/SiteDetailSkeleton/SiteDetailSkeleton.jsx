import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SiteDetailSkeleton = () => {
    return (
        <section id="site-detail">
            <div className="header-text">
                <h1><Skeleton width={350} height={50} /></h1>
                <p><Skeleton width={`100%`} height={20} /></p>
            </div>

            <div className="sub-header-text">
                <div className="sub-text">
                    <Skeleton width={150} height={10} />
                </div>

                <div className="sub-text">
                    <Skeleton width={150} height={10} />
                </div>

                <div className="sub-text">
                    <Skeleton width={30} height={30} borderRadius={10} />
                </div>

                <div className="site-buttons">
                    <Skeleton width={200} height={40} borderRadius={10} />
                </div>

                <div className="site-buttons">
                    <Skeleton width={200} height={40} borderRadius={10} />
                </div>
            </div>

            <Skeleton width={1200} height={500} borderRadius={30} />
        </section>
    );
};

export default SiteDetailSkeleton;
