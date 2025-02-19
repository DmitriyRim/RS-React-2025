import './App.css';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import { ErrorButton } from './components/ErrorBoundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import { Popup } from './components/Popup/Popup';

export default function App() {
  return (
    <>
      <header>
        <Search />
      </header>
      <main>
        <CardList />
        <Outlet />
        <Popup />
      </main>
      <footer>
        <ErrorButton />
      </footer>
    </>
  );
}
