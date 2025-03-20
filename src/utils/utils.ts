const URL = 'https://restcountries.com/v3.1/all';

export async function getAllData() {
  const result = await fetch(URL);

  return await result.json();
}
