import './App.css';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import { ErrorButton } from './components/ErrorBoundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import { Popup } from './components/Popup/Popup';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import { ThemeContext, useThemeContext } from './app/themeContext';

export default function App() {
  const { theme, handleSwitchTheme } = useThemeContext();

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSwitchTheme }}>
      <div className={`background-${theme}`}>
        <div className="container">
          <header>
            <Search />
            <ThemeButton />
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
