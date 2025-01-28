import { Component } from 'react';
import { Book } from '../../types/types';
import './Card.css';

type Props = {
  value: Book;
};

export default class Card extends Component<Props> {
  render() {
    const book = this.props.value;
    return (
      <>
        <li className="card">
          <h3 className="card-title">{book.title}</h3>
          {'image/jpeg' in book.formats &&
          typeof book.formats['image/jpeg'] === 'string' ? (
            <img src={book.formats['image/jpeg']} alt="" />
          ) : null}
          <p className="card-description">{book.summaries}</p>
        </li>
      </>
    );
  }
}
