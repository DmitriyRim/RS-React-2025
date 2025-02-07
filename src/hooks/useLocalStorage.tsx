import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLocalStorage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let ls = localStorage.getItem('searchQuery');

    if (!ls) {
      ls = '';
    }
    navigate(`?search=${ls}`);
    setQuery(ls);
  }, [navigate]);

  return query;
};
