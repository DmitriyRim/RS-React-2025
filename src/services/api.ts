import { ResponseBooks } from '../types/types';

const BASE_URL = 'https://gutendex.com/books/';

export async function getData(
  search: string = ''
): Promise<ResponseBooks | string> {
  try {
    const response = await fetch(BASE_URL + search);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    return new Error(`${error}`).message;
  }
}

export async function rootLoader({ request }: { request: Request }) {
  const url = new URL(request.url);

  return { search: url.search };
}
