import { Outlet, useLoaderData } from 'react-router';
import { Route } from '../+types/root';
import Layout from 'src/components/Layout/layout';
import CardList from 'src/components/CardList/CardList';
import { makeStore } from 'src/store/store';
import { apiSlice } from 'src/api/apiSlice';

export function meta() {
  return [
    { title: 'Book store' },
    { name: 'description', content: 'Welcome to books store!' },
  ];
}

export async function loader(ars: Route.LoaderArgs) {
  const url = new URL(ars.request.url);
  const searchParams = url.searchParams;
  const store = makeStore();
  const result = await store.dispatch(
    apiSlice.endpoints.getData.initiate({
      page: searchParams.get('page') || '',
      search: searchParams.get('search') || '',
    })
  );
  return result.data;
}

export default function RootPage() {
  const data = useLoaderData();

  return (
    <Layout>
      <>
        <CardList result={data} />
        <Outlet />
      </>
    </Layout>
  );
}
