import { ResponseBooks } from '../types/types';

const BASE_URL = 'https://gutendex.com/books/';

export async function getData(
  search: string = ''
): Promise<ResponseBooks | string> {
  const url = new URL(BASE_URL);

  if (search) {
    url.searchParams.set('search', search);
  }

  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    return new Error(`${error}`).message;
  }
}
