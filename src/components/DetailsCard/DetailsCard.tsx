import Link from 'next/link';
import styles from './DetailsCard.module.scss';
import { makeStore } from '../../store/store';
import { apiSlice } from '../../api/apiSlice';

interface Props {
  id: {
    id: string;
  };
}

export default async function DetailsCard({ id }: Props) {
  const store = makeStore();
  const result = await store.dispatch(
    apiSlice.endpoints.getDataById.initiate(id.id)
  );
  const { data } = result;

  function getLists(title: string, arr: string[]) {
    return (
      <>
        <h3>{title}:</h3>
        <ul>
          {arr.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className={styles.details}>
      {data?.id ? (
        <>
          <Link className="close button" href={`/`}>
            X
          </Link>
          <h2>{data.title}</h2>
          <div>
            <img
              src={data.formats?.['image/jpeg'] || '/not-image.jpg'}
              alt=""
              style={{ float: 'left' }}
            />
            {getLists('Summary', data?.summaries)}
          </div>
          <h3>Authors: </h3>
          <ul>
            {data.authors.map((author) => (
              <li key={author.name}>{author.name}</li>
            ))}
          </ul>
          {getLists('Subjects', data.subjects)}
          {getLists('Bookshelves', data.bookshelves)}
          {getLists('Languages', data.languages)}
          <p>Download count: {data.download_count}</p>
        </>
      ) : (
        <span>Not found</span>
      )}
    </div>
  );
}
