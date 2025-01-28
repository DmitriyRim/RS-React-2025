import { ResponseBooks } from '../types/types';

// const BASE_URL = 'https://www.world-wonders-api.org/v0/wonders'; Чюдеса света.
const BASE_URL = 'https://gutendex.com/books/';

export async function getData(search: string = ''): Promise<ResponseBooks> {
  const url = new URL(BASE_URL);

  if (search) {
    url.searchParams.set('search', search);
  }

  const response = await fetch(url);
  return await response.json();
}

// type params = {
//   search
// }
