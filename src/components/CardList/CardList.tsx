import { Component } from 'react';
import { getData } from '../../services/api';
import { Book, ResponseBooks } from '../../types/types';
import Card from '../Card/Card';
import './CardList.css';

type CardListState = {
  data: ResponseBooks;
  loading: boolean;
  error: null | string;
};

type CardListProps = { searchQuery: string };

export default class CardList extends Component<CardListProps, CardListState> {
  state = {
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: false,
    error: null,
  };

  componentDidMount(): void {
    this.setState({ loading: true });
    this.getBooks();
  }

  componentDidUpdate(prevProps: Readonly<CardListProps>): void {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true });
      this.getBooks();
    }
  }

  getBooks = async () => {
    const data = await getData(this.props.searchQuery);

    if (typeof data === 'string') {
      this.setState({ error: data });
    } else {
      this.setState({ loading: false, data });
    }
  };

  showResult = () => {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    const data = this.state.data.results;
    return (
      <ul className="card-list">
        {data.length !== 0
          ? data.map((item: Book) => <Card key={item.id} value={item} />)
          : 'Not found'}
      </ul>
    );
  };

  render() {
    return (
      <>
        {this.state.loading && !this.state.error
          ? 'Loading...'
          : this.showResult()}
      </>
    );
  }
}
