import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SiteHeader from './SiteHeader/SiteHeader';
import RelatedSites from './RelatedSites/RelatedSites';
import SiteDetailSkeleton from './SiteDetailSkeleton/SiteDetailSkeleton';
import { useSiteDetail } from '../../context/SiteDetailContext';

const SiteDetail = () => {
    const { id } = useParams();
    const { site, relatedSites, loading, fetchSiteData } = useSiteDetail();

    useEffect(() => {
        fetchSiteData(id);
    }, [id, fetchSiteData]);

    if (loading) {
        return <SiteDetailSkeleton />;
    }

    return (
        <>
            {site && <SiteHeader site={site} />}
            <RelatedSites relatedSites={relatedSites} category={site?.category} />
        </>
    );
};

export default SiteDetail;
