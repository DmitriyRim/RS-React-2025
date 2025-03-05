import Head from 'next/head';
import CardList from '../components/CardList/CardList';
import { apiSlice } from '../api/apiSlice';
import { wrapper } from '../store/wrapper';
import { ResponseBooks } from '../types/types';

interface BookProps {
  data: ResponseBooks;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;
    const data = await store
      .dispatch(
        apiSlice.endpoints.getData.initiate({
          page: typeof page === 'string' ? page : null,
          search: typeof search === 'string' ? search : null,
        })
      )
      .unwrap();

    return {
      props: {
        data,
      },
    };
  }
);

export default function App(params: BookProps) {
  return (
    <>
      <Head>
        <title>Book store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CardList data={params.data} />
    </>
  );
}
