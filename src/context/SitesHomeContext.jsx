import React, { createContext, useContext, useState, useEffect } from 'react';

import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

const SitesHomeContext = createContext();

export const SitesProvider = ({ children }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const q = query(collection(db, "sites"), limit(5), orderBy("views", "desc"));
        const querySnapshot = await getDocs(q);
        const sitesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSites(sitesData);
      } catch (error) {
        console.error("Error fetching sites: ", error);
        setError("Failed to load sites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return (
    <SitesHomeContext.Provider value={{ sites, loading, error }}>
      {children}
    </SitesHomeContext.Provider>
  );
};

export const useSites = () => useContext(SitesHomeContext);
