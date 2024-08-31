import { useState } from 'react';
import { db } from '../firebase/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';

const fetchSites = async (category, filters) => {
  let categoryQuery = collection(db, 'sites');

  if (category === 'hot') {
    categoryQuery = query(categoryQuery, where('hot', '==', 1));
  } else if (category !== 'all') {
    categoryQuery = query(categoryQuery, where('category', '==', category));
  }

  if (filters.tools && filters.tools.length > 0) {
    categoryQuery = query(categoryQuery, where('tool', 'in', filters.tools));
  }

  const categorySnapshot = await getDocs(categoryQuery);
  return categorySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const useCategorySites = (initialCategory = 'all') => {
  const [filters, setFilters] = useState({ tools: [] }); // Initialize tools as an empty array
  const [category, setCategory] = useState(initialCategory);

  const { data: sites = [], isLoading: loading, error } = useQuery({
    queryKey: ['sites', category, filters],
    queryFn: () => fetchSites(category, filters),
    keepPreviousData: true,
  });

  const handleToolFilterChange = (tool) => {
    setFilters(prevFilters => {
      const newTools = [...prevFilters.tools];
      const index = newTools.indexOf(tool);
      if (index > -1) {
        newTools.splice(index, 1); // Remove tool if it exists
      } else {
        newTools.push(tool); // Add tool if it doesn't exist
      }
      return { ...prevFilters, tools: newTools };
    });
  };

  return {
    sites,
    loading,
    error,
    filters,
    handleToolFilterChange,
    setCategory,
  };
};
