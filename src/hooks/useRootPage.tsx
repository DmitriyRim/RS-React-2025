import { useLocation, useNavigate } from 'react-router-dom';

const useRootPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => {
    if (location.pathname !== '/') {
      navigate('/' + location.search);
    }
  };
};

export default useRootPage;
