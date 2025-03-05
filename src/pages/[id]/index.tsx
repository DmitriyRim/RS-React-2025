import { apiSlice } from '../../api/apiSlice';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import Head from 'next/head';
import { wrapper } from '../../store/wrapper';
import { Book, ResponseBooks } from '../../types/types';
import CardList from '../../components/CardList/CardList';

interface BookProps {
  id: string;
  data: Book;
  dataBooks: ResponseBooks;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;
    const data = await store
      .dispatch(
        apiSlice.endpoints.getDataById.initiate(`${context.params?.id}`)
      )
      .unwrap();

    const dataBooks = await store
      .dispatch(
        apiSlice.endpoints.getData.initiate({
          page: typeof page === 'string' ? page : null,
          search: typeof search === 'string' ? search : null,
        })
      )
      .unwrap();
    return {
      props: {
        id: context.params?.id,
        data,
        dataBooks,
      },
    };
  }
);

export default function details(params: BookProps) {
  return (
    <>
      <Head>
        <title>Details book</title>
      </Head>
      <CardList data={params.dataBooks} />
      <DetailsCard results={params} />
    </>
  );
}
