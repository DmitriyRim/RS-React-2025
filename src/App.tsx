import './App.css';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import { ErrorButton } from './components/ErrorBoundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import { Popup } from './components/Popup/Popup';
import { useState } from 'react';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import { ThemeContext } from './app/themeContext';

export default function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`background theme-${theme}`}>
        <div className="container">
          <header>
            <Search />
            <ThemeButton theme={theme} handleSwitchTheme={setTheme} />
          </header>
          <main>
            <CardList />
            <Outlet />
            <Popup />
          </main>
          <footer>
            <ErrorButton />
          </footer>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
