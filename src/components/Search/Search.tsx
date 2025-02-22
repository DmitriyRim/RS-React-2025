import './Search.css';
import { Form } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../app/themeContext';

export default function Search() {
  const query = useLocalStorage();
  const [input, setInput] = useState(query);
  const { theme } = useContext(ThemeContext);

  return (
    <Form className={`search theme-${theme}`}>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        defaultValue={query}
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
