import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, query, where, collection, getDocs, limit, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

const fetchSiteData = async (id) => {
    const docRef = doc(db, 'sites', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error('Site not found');
    }

    const siteData = docSnap.data();

    // Increment view count by 5
    await updateDoc(docRef, { views: increment(5) });

    // Fetch related sites
    const relatedQuery = query(
        collection(db, 'sites'),
        where('category', '==', siteData.category),
        limit(3)
    );
    const relatedSnap = await getDocs(relatedQuery);

    const relatedSites = relatedSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return { site: siteData, relatedSites };
};

export const useSiteDetail = (id) => {
    return useQuery({
        queryKey: ['siteDetail', id],
        queryFn: () => fetchSiteData(id),
        enabled: !!id, // Only run the query if ID is provided
        staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
};
