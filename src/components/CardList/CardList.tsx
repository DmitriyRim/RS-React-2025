import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Book, ResponseBooks } from '../../types/types';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { getData } from '../../services/api';
import './CardList.css';

export default function CardList() {
  const query = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResponseBooks>();
  const [error, setError] = useState<null | string>(null);

  const showResult = () => {
    if (error) {
      return <h1>{error}</h1>;
    }

    return data?.results.length !== 0 ? (
      <ul className="card-list">
        {data?.results.map((item: Book) => <Card key={item.id} value={item} />)}
      </ul>
    ) : (
      <p className="card-list__message">Not found</p>
    );
  };

  useEffect(() => {
    setLoading(true);
    const getBooks = async () => {
      const data = await getData(query.search);

      if (typeof data === 'string') {
        setError(data);
      } else if ('results' in data) {
        setData(data);
      }
      setLoading(false);
    };
    getBooks();
  }, [query]);

  return (
    <div className="main">{loading && !error ? <Loader /> : showResult()}</div>
  );
}
