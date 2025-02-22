import { useEffect, useState } from 'react';

export const useLocalStorage = () => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const ls = localStorage.getItem('searchQuery');

    if (typeof ls === 'string') {
      setQuery(ls);
    }
  }, []);

  return query;
};
