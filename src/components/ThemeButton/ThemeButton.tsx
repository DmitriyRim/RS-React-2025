import './ThemeButton.css';

interface Props {
  theme: string;
  handleSwitchTheme: (theme: string) => void;
}

export const ThemeButton = ({ theme, handleSwitchTheme }: Props) => {
  return (
    <div className="toggle-switch">
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={() =>
            handleSwitchTheme(theme === 'dark' ? 'light' : 'dark')
          }
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
