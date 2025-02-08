import './Search.css';
import { Form } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useState } from 'react';

export default function Search() {
  const query = useLocalStorage();
  const [input, setInput] = useState(query);

  return (
    <Form>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        defaultValue={query}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
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
