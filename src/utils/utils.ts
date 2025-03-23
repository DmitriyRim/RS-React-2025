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
