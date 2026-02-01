import { useState, useEffect } from 'react';
import { projectsApi } from '@/services/api';

export interface FilterOptions {
  skills: { id: number; name: string }[];
  specialties: { id: number; name: string }[];
  industries: { id: number; name: string }[];
  categories: { id: number; name: string }[];
}

export function useFilterOptions() {
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await projectsApi.getFilterOptions();
        setOptions(data);
      } catch (error) {
        console.error('Error loading filter options', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { options, loading };
}