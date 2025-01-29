import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import ErrorBoundary, {
  ErrorButton,
} from './components/ErrorBoundary/ErrorBoundary';

type State = {
  searchInput: string;
  currentQuery: string;
};

class App extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchInput: this.initialState(),
      currentQuery: this.initialState(),
    };
  }

  handleChangeInput = (e: { target: { value: string } }) => {
    const value = e.target.value;

    localStorage.setItem('search', value);
    this.setState((prevState) => {
      return { ...prevState, searchInput: value };
    });
  };

  handleSearch = () => {
    this.setState((prevState) => {
      return { ...prevState, currentQuery: prevState.searchInput.trim() };
    });
  };

  initialState = (): string => {
    let ls = localStorage.getItem('search');

    if (!ls) {
      ls = '';
      localStorage.setItem('search', ls);
    }

    return ls;
  };

  render() {
    return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <header>
          <Search
            value={this.state.searchInput}
            onChange={this.handleChangeInput}
          />
          <Button value="Search" onClick={this.handleSearch} />
        </header>
        <main>
          <CardList searchQuery={this.state.currentQuery} />
        </main>
        <footer>
          <ErrorButton />
        </footer>
      </ErrorBoundary>
    );
  }
}

export default App;
