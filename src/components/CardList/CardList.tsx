import { Book, ResponseBooks } from '../../types/types';
import Card from '../Card/Card';
import styles from './CardList.module.scss';
import Pagination from '../Pagination/Pagination';

interface Props {
  result: ResponseBooks;
}

export default function CardList({ result }: Props) {
  const showResult = () => {
    if (result) {
      const { count } = result;
      const totalPages = Math.ceil(count / 32);

      return result.results.length !== 0 ? (
        <>
          <ul className={styles['card-list']}>
            {result.results.map((item: Book) => (
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

  return <div className={`main theme-${1}`}>{showResult()}</div>;
}
