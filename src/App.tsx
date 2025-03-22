import { useEffect, useState } from 'react';
import './App.css';
import {
  filterData,
  getAllData,
  getAllRegions,
  searchData,
  sortData,
} from './utils/utils';
import Card from './components/Card';
import { Country } from './types/types';

function App() {
  const [data, setData] = useState<Country[]>([]);
  const [displayData, setDisplayData] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('default');

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
    let newData = [...data];
    newData = filterData([...data], currentRegion);
    newData = searchData(newData, search);
    newData = sortData(newData, sort);
    setDisplayData(newData);
  }, [currentRegion, data, search, sort]);

  return (
    <>
      <h1>Performance</h1>
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
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="abs">Population ↑</option>
        <option value="xyz">Population ↓</option>
      </select>
      {displayData.map((country) => (
        <Card country={country} key={country.name.common} />
      ))}
    </>
  );
}

export default App;
