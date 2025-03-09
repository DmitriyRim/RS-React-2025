import { Link, useSearchParams } from 'react-router';
import styles from './DetailsCard.module.scss';
import { Book } from 'src/types/types';

interface Props {
  result: Book;
}

export default function DetailsCard({ result }: Props) {
  const [searchParams] = useSearchParams();
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
      {result?.id ? (
        <>
          <Link className="close button" to={`/${searchParams.toString()}`}>
            X
          </Link>
          <h2>{result.title}</h2>
          <div>
            <img
              src={result.formats?.['image/jpeg'] || '/not-image.jpg'}
              alt=""
              style={{ float: 'left' }}
            />
            {getLists('Summary', result?.summaries)}
          </div>
          <h3>Authors: </h3>
          <ul>
            {result.authors.map((author) => (
              <li key={author.name}>{author.name}</li>
            ))}
          </ul>
          {getLists('Subjects', result.subjects)}
          {getLists('Bookshelves', result.bookshelves)}
          {getLists('Languages', result.languages)}
          <p>Download count: {result.download_count}</p>
        </>
      ) : (
        <span>Not found</span>
      )}
    </div>
  );
}
