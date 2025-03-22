import { Country } from '../types/types';

const URL = 'https://restcountries.com/v3.1/all';

export async function getAllData() {
  const result = await fetch(URL);

  return await result.json();
}

export function getAllRegions(data: Country[]) {
  const regions: string[] = [];
  data.forEach((item) => {
    if (!regions.includes(item.region)) {
      regions.push(item.region);
    }
  });
  return regions;
}

export const filterData = (
  data: Country[],
  currentRegion: string
): Country[] => {
  if (currentRegion !== 'all') {
    return data.filter((data) => data.region === currentRegion);
  }
  return data;
};

export const searchData = (data: Country[], search: string): Country[] => {
  const regex = new RegExp(search, 'i');
  return data.filter((country) => regex.test(country.name.common));
};

export const sortData = (data: Country[], sortBy: string): Country[] => {
  const newData = [...data];
  if (sortBy === 'abs') {
    return newData.sort((a, b) => a.population - b.population);
  } else if (sortBy === 'xyz') {
    return newData.sort((a, b) => b.population - a.population);
  } else {
    return newData;
  }
};
