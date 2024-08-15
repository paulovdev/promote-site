import React from 'react';
import { useParams } from 'react-router-dom';
import SiteHeader from './SiteHeader/SiteHeader';
import RelatedSites from './RelatedSites/RelatedSites';
import SiteDetailSkeleton from './SiteDetailSkeleton/SiteDetailSkeleton';
import { useSiteDetail } from '../../hooks/UseSiteDetail';
import { AnimatePresence, motion } from 'framer-motion';

const SiteDetail = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useSiteDetail(id);

    if (isLoading) {
        return <SiteDetailSkeleton />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ duration: 0.5, ease: 'backIn' }}
                key={id}
            >
                {data.site && <SiteHeader site={data.site} />}
                <RelatedSites relatedSites={data.relatedSites} category={data.site?.category} />
            </motion.div>
        </AnimatePresence>
    );
};

export default SiteDetail;
