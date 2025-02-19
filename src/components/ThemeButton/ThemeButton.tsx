import { useContext } from 'react';
import { ThemeContext } from '../../app/themeContext';
import './ThemeButton.css';

export const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="toggle-switch">
      <label>
        <input type="checkbox" checked={theme === 'dark'} onChange={setTheme} />
        <span className="slider"></span>
      </label>
    </div>
  );
};
