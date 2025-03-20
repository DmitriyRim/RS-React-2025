import { useEffect, useState } from 'react';
import './App.css';
import { getAllData } from './utils/utils';
import Card from './components/Card';
import { Country } from './types/types';

function App() {
  const [data, setData] = useState<Country[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getAllData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <>
      <h1>performance</h1>
      {data.map((country) => (
        <Card country={country} key={country.name.common} />
      ))}
    </>
  );
}

export default App;
// Выведите список стран с указанием их названий, численности населения, региона и флага.
