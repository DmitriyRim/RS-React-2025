import { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext';
import styles from './ThemeButton.module.scss';

export const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={styles['toggle-switch']}>
      <label className={styles['toggle-switch_label']}>
        <input
          className={styles['toggle-switch_input']}
          type="checkbox"
          checked={theme === 'dark'}
          onChange={setTheme}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
