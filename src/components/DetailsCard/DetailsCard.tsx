import { useLoaderData } from 'react-router-dom';
import './DetailsCard.css';
import useRootPage from '../../hooks/useRootPage';
import Loader from '../Loader/Loader';
import { useGetDataByIdQuery } from '../../api/apiSlice';

export default function DetailsCard() {
  const id = useLoaderData();
  const rootPage = useRootPage();
  const { data, isFetching } = useGetDataByIdQuery(id);

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
      {isFetching ? (
        <Loader />
      ) : data?.id ? (
        <>
          <button className="close" onClick={rootPage}>
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
