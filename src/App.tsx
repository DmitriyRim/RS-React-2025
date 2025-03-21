import { useEffect, useState } from 'react';
import './App.css';
import { getAllData, getAllRegions } from './utils/utils';
import Card from './components/Card';
import { Country } from './types/types';

function App() {
  const [data, setData] = useState<Country[]>([]);
  const [displayData, setDisplayData] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('all');

  useEffect(() => {
    const getData = async () => {
      const result = await getAllData();
      setData(result);
      setDisplayData(result);
      setRegions(getAllRegions(result));
    };

    getData();
  }, []);

  useEffect(() => {
    const filterData = (data: Country[]) => {
      let filterData = [...data];
      if (currentRegion !== 'all') {
        filterData = filterData.filter((data) => data.region === currentRegion);
      }
      setDisplayData(filterData);
    };
    filterData(data);
  }, [currentRegion, data]);

  return (
    <>
      <h1>performance</h1>
      <select
        value={currentRegion}
        onChange={(e) => {
          setCurrentRegion(e.target.value);
        }}
      >
        <option value={'all'}>all</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      {displayData.map((country) => (
        <Card country={country} key={country.name.common} />
      ))}
    </>
  );
}

export default App;
/*
Фильтр: позволяет пользователям фильтровать страны по регионам с помощью выпадающего меню.
Поиск: Добавьте строку поиска, чтобы пользователи могли выполнять поиск стран по названию.
Сортировка: добавьте возможность сортировать страны по численности населения или названию
(по возрастанию/убыванию).
*/
