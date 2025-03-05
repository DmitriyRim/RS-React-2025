import { ReactNode } from 'react';
import Search from '../Search/Search';
import { ThemeContext, useThemeContext } from '../../store/themeContext';
import ErrorBoundary, { ErrorButton } from '../ErrorBoundary/ErrorBoundary';

import { ThemeButton } from '../ThemeButton/ThemeButton';
import { Popup } from '../Popup/Popup';

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, handleSwitchTheme } = useThemeContext();

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ThemeContext.Provider value={{ theme, setTheme: handleSwitchTheme }}>
        <div className={`background-${theme}`}>
          <div className="container">
            <header>
              <Search />
              <ThemeButton />
            </header>
            <main>
              {children}
              <Popup />
            </main>
            <footer>
              <ErrorButton />
            </footer>
          </div>
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}
