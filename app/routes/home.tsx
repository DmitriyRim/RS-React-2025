import { makeStore } from 'src/store/store';
import type { Route } from './+types/home';
import { apiSlice } from 'src/api/apiSlice';
import { useLoaderData } from 'react-router';
import DetailsCard from 'src/components/DetailsCard/DetailsCard';

export function meta() {
  return [
    { title: 'Book store' },
    { name: 'description', content: 'Welcome to book store!' },
  ];
}
export async function loader({ params }: Route.LoaderArgs) {
  const store = makeStore();
  const result = await store.dispatch(
    apiSlice.endpoints.getDataById.initiate(params.id)
  );

  return result.data;
}

export default function Details() {
  const data = useLoaderData();
  return <DetailsCard result={data} />;
}
