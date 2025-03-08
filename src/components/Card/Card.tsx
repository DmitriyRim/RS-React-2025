'use client';

import { useSearchParams } from 'next/navigation';
import { Book } from '../../types/types';
import styles from './Card.module.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addCard, removeCard, selectCheckedCard } from '../../api/checkedSlice';
import { redirect } from 'next/navigation';

type Props = {
  value: Book;
};

export default function Card({ value }: Props) {
  const searchParams = useSearchParams();
  const checkedData = useAppSelector(selectCheckedCard) || [];
  const dispatch = useAppDispatch();
  const { id, title, formats, summaries } = value;
  const isAdded = checkedData.some((data) => data.id === value.id);
  const imageUrl = formats?.['image/jpeg'] || '/not-image.jpg';
  const params = searchParams?.toString();

  const handleChangeInput = () => {
    if (!isAdded) {
      dispatch(addCard(value));
    } else {
      dispatch(removeCard(value.id));
    }
  };

  return (
    <li
      className={`card ${styles.card}`}
      onClick={(e) => {
        if (
          e.target instanceof HTMLElement &&
          !e.target.classList.contains('button') &&
          e.target.tagName !== 'INPUT'
        ) {
          redirect(`/${id}${params ? '?' + params : ''}`);
        }
      }}
    >
      <h3 className={styles['card-title']}>{value.title}</h3>
      <img src={imageUrl} className={styles['card-image']} alt={title} />
      <p className={styles['card-description']}>{summaries}</p>
      <div
        className={`button ${styles['card-button']}`}
        onClick={handleChangeInput}
      >
        {isAdded ? 'Remove' : 'Add'}
        <input
          type="checkbox"
          checked={isAdded}
          id={`${id}`}
          onChange={handleChangeInput}
        />
      </div>
    </li>
  );
}
