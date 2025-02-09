import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Book, ResponseBooks } from '../../types/types';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { getData } from '../../services/api';
import './CardList.css';
import Pagination from '../Pagination/Pagination';
import useRootPage from '../../hooks/useRootPage';

export default function CardList() {
  const { search } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResponseBooks>();
  const [error, setError] = useState<null | string>(null);
  const rootPage = useRootPage();

  const showResult = () => {
    if (error) {
      return <h1>{error}</h1>;
    }

    if (data && 'results' in data) {
      const { count, results } = data;
      const totalPages = Math.ceil(count / 32);

      return results.length !== 0 ? (
        <>
          <ul className="card-list">
            {results.map((item: Book) => (
              <Card key={item.id} value={item} />
            ))}
          </ul>
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="card-list__message">Not found</p>
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    const getBooks = async () => {
      const data = await getData(search);

      if (typeof data === 'string') {
        setError(data);
      } else if ('results' in data) {
        setData(data);
      }
      setLoading(false);
    };
    getBooks();
  }, [search]);

  return (
    <div className="main" onClick={rootPage}>
      {loading && !error ? <Loader /> : showResult()}
    </div>
  );
}
