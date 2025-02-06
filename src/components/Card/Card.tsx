import { Book } from '../../types/types';
import './Card.css';

type Props = {
  value: Book;
};

export default function Card({ value }: Props) {
  return (
    <>
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
    </>
  );
}
