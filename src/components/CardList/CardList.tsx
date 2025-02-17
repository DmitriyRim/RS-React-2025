import { useLoaderData } from 'react-router-dom';
import { Book } from '../../types/types';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import './CardList.css';
import Pagination from '../Pagination/Pagination';
import useRootPage from '../../hooks/useRootPage';
import { useGetDataQuery } from '../../api/apiSlice';

export default function CardList() {
  const params = useLoaderData<{
    page: string | null;
    search: string | null;
  }>();
  const { data, isFetching, error } = useGetDataQuery(params);
  const rootPage = useRootPage();

  const showResult = () => {
    let errorMessage: string = '';
    if (error) {
      if ('status' in error) {
        errorMessage =
          'error' in error ? error.error : JSON.stringify(error.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      return <h1>{errorMessage}</h1>;
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

  return (
    <div className="main" onClick={rootPage}>
      {isFetching && !error ? <Loader /> : showResult()}
    </div>
  );
}
