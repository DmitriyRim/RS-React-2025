import { Book, ResponseBooks } from '../../types/types';
import Card from '../Card/Card';
import styles from './CardList.module.scss';
import Pagination from '../Pagination/Pagination';

import { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext';
import { useLoader } from '../../hooks/useLoader';
import Loader from '../Loader/Loader';

interface Props {
  data: ResponseBooks;
}

export default function CardList({ data }: Props) {
  const { theme } = useContext(ThemeContext);
  const { count, results } = data;
  const loading = useLoader();

  const showResult = () => {
    if (loading) {
      return <Loader />;
    }
    if (data) {
      const totalPages = Math.ceil(count / 32);

      return results.length !== 0 ? (
        <>
          <ul className={styles['card-list']}>
            {results.map((item: Book) => (
              <Card key={item.id} value={item} />
            ))}
          </ul>
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className={styles['card-list__message']}>Not found</p>
      );
    }
  };

  return <div className={`main theme-${theme}`}>{showResult()}</div>;
}
