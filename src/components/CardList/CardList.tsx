import { Book } from '../../types/types';
import Card from '../Card/Card';
import styles from './CardList.module.scss';
import Pagination from '../Pagination/Pagination';

import { apiSlice } from '../../api/apiSlice';
import { makeStore } from '../../store/store';

interface Props {
  queryParams: {
    page: string;
    search: string;
  };
}

export default async function CardList({ queryParams }: Props) {
  const store = makeStore();
  const result = await store.dispatch(
    apiSlice.endpoints.getData.initiate(queryParams)
  );
  const { data } = result;
  const showResult = () => {
    if (data) {
      const { count } = data;
      const totalPages = Math.ceil(count / 32);

      return data.results.length !== 0 ? (
        <>
          <ul className={styles['card-list']}>
            {data.results.map((item: Book) => (
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
