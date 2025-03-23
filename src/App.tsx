import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { getAllData, getAllRegions } from './utils/utils';
import Card from './components/Card';
import { Country } from './types/types';

function App() {
  const [data, setData] = useState<Country[]>([]);
  const [displayData, setDisplayData] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('default');
  const filterData = useMemo(
    () =>
      (data: Country[]): Country[] => {
        if (currentRegion !== 'all') {
          return data.filter((data) => data.region === currentRegion);
        }
        return data;
      },
    [currentRegion]
  );

  const searchData = useMemo(
    () =>
      (data: Country[]): Country[] => {
        const regex = new RegExp(search, 'i');
        return data.filter((country) => regex.test(country.name.common));
      },
    [search]
  );

  const sortData = useCallback(
    (data: Country[]): Country[] => {
      const newData = [...data];
      if (sort === 'abs') {
        return newData.sort((a, b) => a.population - b.population);
      } else if (sort === 'xyz') {
        return newData.sort((a, b) => b.population - a.population);
      } else {
        return newData;
      }
    },
    [sort]
  );

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
    newData = filterData([...data]);
    newData = searchData(newData);
    newData = sortData(newData);
    setDisplayData(newData);
  }, [data, filterData, searchData, sortData]);

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
