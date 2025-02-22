import { removeAll, selectCheckedCard } from '../../api/checkedSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createBlobUrl } from '../../utils/utils';
import './Popup.css';

export const Popup = () => {
  const checkedData = useAppSelector(selectCheckedCard);
  const dispatch = useAppDispatch();

  if (checkedData.length === 0) {
    return null;
  }

  return (
    <div className="popup">
      <p>{checkedData.length} items are selected</p>
      <div className="popup-buttons">
        <button className="button" onClick={() => dispatch(removeAll())}>
          Unselect all
        </button>
        <a
          className="button"
          href={createBlobUrl(checkedData)}
          download={`${checkedData.length}_books.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
};
