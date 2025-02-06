import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getData } from '../../services/api';
import { Book } from '../../types/types';
import './DetailsCard.css';
import useRootPage from '../../hooks/useRootPage';
import Loader from '../Loader/Loader';

export default function DetailsCard() {
  const id = useLoaderData();
  const [details, setDetails] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const rootPage = useRootPage();

  useEffect(() => {
    async function getDetails() {
      const data = await getData(id);
      if (typeof data !== 'string' && 'id' in data) {
        setDetails(data);
      }
      setLoading(false);
    }

    setLoading(true);
    getDetails();
  }, [id]);

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
    <div className="details">
      {loading ? (
        <Loader />
      ) : details?.id ? (
        <>
          <button className="close" onClick={rootPage}>
            X
          </button>
          <h2>{details?.title}</h2>
          <div>
            {details &&
            'image/jpeg' in details.formats &&
            typeof details.formats['image/jpeg'] === 'string' ? (
              <img
                src={details.formats['image/jpeg']}
                alt=""
                style={{ float: 'left' }}
              />
            ) : null}
            {getLists('Summary', details?.summaries)}
          </div>
          <h3>Authors: </h3>
          <ul>
            {details?.authors.map((author) => (
              <li key={author.name}>{author.name}</li>
            ))}
          </ul>
          {getLists('Subjects', details?.subjects)}
          {getLists('Bookshelves', details?.bookshelves)}
          {getLists('Languages', details?.languages)}
          <p>Download count: {details?.download_count}</p>
        </>
      ) : (
        <span>Not found</span>
      )}
    </div>
  );
}
