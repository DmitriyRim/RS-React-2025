import styles from './Search.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../store/themeContext';
import { Form } from 'react-router';

export default function Search() {
  const query = useLocalStorage();
  const [input, setInput] = useState(query);
  const { theme } = useContext(ThemeContext);

  return (
    <Form className={`${styles.search} theme-${theme}`} action={'/'}>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        defaultValue={query}
        className={styles['search_input']}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="button"
        type="submit"
        onClick={() => {
          localStorage.setItem('searchQuery', input);
        }}
      >
        Search
      </button>
    </Form>
  );
}
