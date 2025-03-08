import React, { Suspense } from 'react';
import CardList from '../components/CardList/CardList';
import Loader from '../components/Loader/Loader';

export const metadata = {
  title: 'Books',
  description: 'Book collection',
};

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = {
    search: searchParams?.search || '',
    page: searchParams?.page || '',
  };
  return (
    <Suspense key={query.toString()} fallback={<Loader />}>
      <CardList queryParams={query} />
    </Suspense>
  );
}
