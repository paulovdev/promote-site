import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/Firebase';
import { doc, getDoc, collection, query, where, limit, getDocs, updateDoc, increment } from 'firebase/firestore';

const SiteDetailContext = createContext();

export const SiteDetailProvider = ({ children }) => {
  const [site, setSite] = useState(null);
  const [relatedSites, setRelatedSites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSiteData = async (id) => {
    try {
      const docRef = doc(db, 'sites', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const siteData = docSnap.data();
        setSite(siteData);

        await updateDoc(docRef, { views: increment(5) });

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
    } catch (error) {
      console.error('Error fetching site data: ', error);
    }
    setLoading(false);
  };

  return (
    <SiteDetailContext.Provider value={{ site, relatedSites, loading, fetchSiteData }}>
      {children}
    </SiteDetailContext.Provider>
  );
};

export const useSiteDetail = () => useContext(SiteDetailContext);
