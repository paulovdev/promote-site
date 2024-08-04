import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CategorySkeleton = () => (
    <>
        {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton-card">
                <Skeleton height={350} width={600} borderRadius={10} />
                <Skeleton height={20} width={`60%`} style={{ marginTop: '10px' }} />
                <Skeleton height={15} width={`80%`} style={{ marginTop: '10px' }} />
                <Skeleton height={15} width={`40%`} style={{ marginTop: '10px' }} />
                <br /><br />
            </div>
        ))}
    </>
);

export default CategorySkeleton;
