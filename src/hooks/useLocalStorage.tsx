import { useEffect, useState } from 'react';

export const useLocalStorage = () => {
  const [query, setQuery] = useState('');
  useEffect(() => {
    let ls = localStorage.getItem('searchQuery');

    if (!ls) {
      ls = '';
    }

    setQuery(ls);
  }, []);

  return query;
};
