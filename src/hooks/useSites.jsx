import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { useQuery } from '@tanstack/react-query';

export const useSites = () => {
  const { data: sites = [], isLoading: loading, error } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      const q = query(collection(db, "sites"), limit(15), orderBy("views", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });

  return { sites, loading, error };
};
