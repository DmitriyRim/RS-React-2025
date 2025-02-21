import { useLoaderData, useNavigate } from 'react-router-dom';
import './DetailsCard.css';
import Loader from '../Loader/Loader';
import { useGetDataByIdQuery } from '../../api/apiSlice';
import { useContext } from 'react';
import { ThemeContext } from '../../app/themeContext';

export default function DetailsCard() {
  const id = useLoaderData();
  const navigate = useNavigate();
  const { data, isFetching } = useGetDataByIdQuery(id);
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
    <div className={`details theme-${theme}`}>
      {isFetching ? (
        <Loader />
      ) : data?.id ? (
        <>
          <button
            className="close button"
            onClick={() => navigate('/' + location.search)}
          >
            X
          </button>
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
