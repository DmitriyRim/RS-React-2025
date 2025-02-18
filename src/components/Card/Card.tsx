import { Link, useLocation } from 'react-router-dom';
import { Book } from '../../types/types';
import './Card.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addCard, removeCard, selectCheckedCard } from '../../api/checkedSlice';

type Props = {
  value: Book;
};

export default function Card({ value }: Props) {
  const location = useLocation();
  const checkedData = useAppSelector(selectCheckedCard);
  const dispatch = useAppDispatch();
  const isAdded = checkedData.some((data) => data.id === value.id);

  const handleChangeInput = () => {
    if (!isAdded) {
      dispatch(addCard(value));
    } else {
      dispatch(removeCard(value.id));
    }
  };

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
        <form>
          <label htmlFor={`${value.id}`} onClick={handleChangeInput}>
            {isAdded ? 'Remove' : 'Add'}
            <input
              type="checkbox"
              checked={isAdded}
              id={`${value.id}`}
              onChange={handleChangeInput}
            />
          </label>
        </form>
      </li>
    </Link>
  );
}
