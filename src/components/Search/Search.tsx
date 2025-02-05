import './Search.css';
import { Form } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function Search() {
  const query = useLocalStorage();

  return (
    <Form>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        defaultValue={query}
      />
      <button
        type="submit"
        onClick={(event) => {
          const value = event.currentTarget.form?.search.value;

          localStorage.setItem('searchQuery', value);
        }}
      >
        Search
      </button>
    </Form>
  );
}
