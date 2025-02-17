import { Link, useLocation } from 'react-router-dom';
import { Book } from '../../types/types';
import './Card.css';

type Props = {
  value: Book;
};

export default function Card({ value }: Props) {
  const location = useLocation();

  return (
    <Link to={`${value.id}${location.search}`}>
      <li className="card">
        <h3 className="card-title">{value.title}</h3>
        {'image/jpeg' in value.formats &&
        typeof value.formats['image/jpeg'] === 'string' ? (
          <img
            src={value.formats['image/jpeg']}
            className="card-image"
            alt=""
          />
        ) : null}
        <p className="card-description">{value.summaries}</p>
      </li>
    </Link>
  );
}
