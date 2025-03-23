import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { Country } from '../types/types';
import Card from './Card';

export default function DetailsCard() {
  const name = useLoaderData();
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    const setLocalStorage = (name: string) => {
      const visitedCountry = localStorage.getItem('countries');

      if (visitedCountry) {
        const countries: string[] = JSON.parse(visitedCountry);
        if (!countries.includes(name)) {
          localStorage.setItem(
            'countries',
            JSON.stringify([...countries, name])
          );
        }
      } else {
        localStorage.setItem('countries', JSON.stringify([name]));
      }
    };
    const getCountry = async (name: string) => {
      const result = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await result.json();
      setCountry(data[0]);
    };
    setLocalStorage(name);
    getCountry(name);
  }, [name]);

  return (
    <div>
      <Link to="/">Home</Link>
      {country && <Card country={country} />}
    </div>
  );
}
