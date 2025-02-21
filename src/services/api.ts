import { LoaderFunctionArgs } from 'react-router-dom';

export async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  return {
    page: url.searchParams.get('page'),
    search: url.searchParams.get('search'),
  };
}

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return id;
}
