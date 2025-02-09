import { Book, ResponseBooks } from '../types/types';
import { LoaderFunctionArgs } from 'react-router-dom';

const BASE_URL = 'https://gutendex.com/books/';

export async function getData(
  search: string = ''
): Promise<ResponseBooks | Book | string> {
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

export async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  return url;
}

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return id;
}
