import { removeAll, selectCheckedCard } from '../../api/checkedSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Book } from '../../types/types';
import './Popup.css';

export const Popup = () => {
  const checkedData = useAppSelector(selectCheckedCard);
  const dispatch = useAppDispatch();

  if (checkedData.length === 0) {
    return null;
  }

  const convertToCsv = (data: Book[]) => {
    const rows = data
      .map((item: Book) => {
        return Object.entries(item)
          .map((fields) => {
            const [key, value] = fields;
            return `${key}: ${JSON.stringify(value)}`;
          })
          .join(';');
      })
      .join('\n');
    return rows;
  };

  const createBlobUrl = () => {
    return window.URL.createObjectURL(
      new Blob([convertToCsv(checkedData)], {
        type: 'text/csv;charset=utf-8;',
      })
    );
  };

  return (
    <div className="popup">
      <p>{checkedData.length} items are selected</p>
      <button onClick={() => dispatch(removeAll())}>Unselect all</button>
      <a href={createBlobUrl()} download={`${checkedData.length}_books.csv`}>
        Download
      </a>
    </div>
  );
};
