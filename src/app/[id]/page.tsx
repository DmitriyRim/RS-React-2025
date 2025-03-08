import React, { Suspense } from 'react';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import Loader from '../../components/Loader/Loader';
import CardList from '../../components/CardList/CardList';

export const metadata = {
  title: 'Book details',
  description: 'Book collection',
};

export default async function Details(props: {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const id = await props.params;
  const searchParams = await props.searchParams;
  const query = {
    search: searchParams?.search || '',
    page: searchParams?.page || '',
  };
  return (
    <>
      <Suspense key={query.toString()} fallback={<Loader />}>
        <CardList queryParams={query} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <DetailsCard id={id} />
      </Suspense>
    </>
  );
}
