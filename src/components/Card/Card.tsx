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
  const { id, title, formats, summaries } = value;
  const isAdded = checkedData.some((data) => data.id === value.id);
  const imageUrl = formats?.['image/jpeg'];

  const handleChangeInput = () => {
    if (!isAdded) {
      dispatch(addCard(value));
    } else {
      dispatch(removeCard(value.id));
    }
  };

  return (
    <Link to={`${id}${location.search}`}>
      <li className="card">
        <h3 className="card-title">{value.title}</h3>
        {imageUrl && <img src={imageUrl} className="card-image" alt={title} />}
        <p className="card-description">{summaries}</p>
        <form>
          <label htmlFor={`${id}`} onClick={handleChangeInput}>
            {isAdded ? 'Remove' : 'Add'}
            <input
              type="checkbox"
              checked={isAdded}
              id={`${id}`}
              onChange={handleChangeInput}
            />
          </label>
        </form>
      </li>
    </Link>
  );
}
