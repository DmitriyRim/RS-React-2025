import { useAppSelector } from '../store/hooks';
import {
  selectControlledData,
  selectUncontrolledData,
} from '../store/sliceFormData';
import Card from './Card';

export default function CardList() {
  const uncontrolled = useAppSelector(selectUncontrolledData);
  const controlled = useAppSelector(selectControlledData);

  return (
    <div className="results">
      <h1>Users</h1>
      <div className="card-list">
        <Card data={controlled} title="Controlled" />
        <Card data={uncontrolled} title="Uncontrolled" />
      </div>
    </div>
  );
}
