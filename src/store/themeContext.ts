import { createContext, useState } from 'react';

interface MyContextType {
  theme: string;
  setTheme?: () => void;
}

export const ThemeContext = createContext<MyContextType>({
  theme: 'dark',
});

export const useThemeContext = () => {
  const [theme, setTheme] = useState<string>('dark');

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, handleSwitchTheme };
};
