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

  const categorySnapshot = await getDocs(categoryQuery);
  return categorySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Atualize para usar filters como um objeto
export const useCategorySites = (initialCategory = 'all', initialFilters = { tools: [] }) => {
  const [category, setCategory] = useState(initialCategory);
  const [filters, setFilters] = useState(initialFilters);

  const { data: sites = [], isLoading: loading, error } = useQuery({
    queryKey: ['sites', category, filters], // Adicionado filters à queryKey
    queryFn: () => fetchSites(category, filters),
    keepPreviousData: true,
  });

  return {
    sites,
    loading,
    error,
    setCategory,
    filters,
    setFilters,
  };
};