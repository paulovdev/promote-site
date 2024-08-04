import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [category, setCategory] = useState('all');

  const fetchSites = async () => {
    try {
      setLoading(true);
      let categoryQuery;

      if (category === 'all') {
        categoryQuery = collection(db, 'sites');
      } else {
        categoryQuery = query(collection(db, 'sites'), where('category', '==', category));
      }

      if (filters.tools && filters.tools.length > 0) {
        categoryQuery = query(
          categoryQuery,
          where('tool', 'in', filters.tools)
        );
      }

      const categorySnapshot = await getDocs(categoryQuery);
      const categorySites = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSites(categorySites);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, [category, filters]);

  const handleToolFilterChange = (tool) => {
    setFilters(prevFilters => {
      const newTools = prevFilters.tools ? [...prevFilters.tools] : [];
      if (newTools.includes(tool)) {
        return { ...prevFilters, tools: newTools.filter(t => t !== tool) };
      } else {
        return { ...prevFilters, tools: [...newTools, tool] };
      }
    });
  };

  return (
    <CategoryContext.Provider value={{ sites, loading, filters, handleToolFilterChange, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
