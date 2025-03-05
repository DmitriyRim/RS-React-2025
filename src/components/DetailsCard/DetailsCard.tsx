import Link from 'next/link';
import styles from './DetailsCard.module.scss';
import { Book } from '../../types/types';
import Loader from '../Loader/Loader';
import { LoaderPath, useLoader } from '../../hooks/useLoader';
import { ThemeContext } from '../../store/themeContext';
import { useContext } from 'react';

interface Props {
  results: {
    data: Book;
  };
}

export default function DetailsCard({ results }: Props) {
  const { data } = results;
  const loading = useLoader(LoaderPath.PageId);
  const { theme } = useContext(ThemeContext);

  function getLists(title: string, arr: string[] | undefined) {
    if (!arr) {
      return null;
    }

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
    <div className={`${styles.details} theme-${theme}`}>
      {loading ? (
        <Loader />
      ) : data?.id ? (
        <>
          <Link className="close button" href={`/`}>
            X
          </Link>
          <h2>{data?.title}</h2>
          <div>
            {data &&
            'image/jpeg' in data.formats &&
            typeof data.formats['image/jpeg'] === 'string' ? (
              <img
                src={data.formats['image/jpeg']}
                alt=""
                style={{ float: 'left' }}
              />
            ) : null}
            {getLists('Summary', data?.summaries)}
          </div>
          <h3>Authors: </h3>
          <ul>
            {data?.authors.map((author) => (
              <li key={author.name}>{author.name}</li>
            ))}
          </ul>
          {getLists('Subjects', data?.subjects)}
          {getLists('Bookshelves', data?.bookshelves)}
          {getLists('Languages', data?.languages)}
          <p>Download count: {data?.download_count}</p>
        </>
      ) : (
        <span>Not found</span>
      )}
    </div>
  );
}
