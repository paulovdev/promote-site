import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CategorySkeleton = () => (
    <>
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton-card">
                <Skeleton height={200} width={`100%`} borderRadius={10} />
                <Skeleton height={15} width={`60%`} style={{ marginTop: '10px' }} />
                <br /><br />
            </div>
        ))}
    </>
);

export default CategorySkeleton;
