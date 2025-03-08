'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();
  const currentPage = searchParams.has('page')
    ? Number(searchParams.get('page'))
    : 1;
  const maxPageNumbers = 5;

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${pageNumber}`);
    router.push(`/${id ? id : ''}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    if (totalPages <= maxPageNumbers) {
      return [...Array(totalPages).keys()].map((num) => num + 1);
    }

    let start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const end = Math.min(totalPages, start + maxPageNumbers - 1);

    if (end === totalPages) {
      start = totalPages - maxPageNumbers + 1;
    }

    return [...Array(end - start + 1).keys()].map((num) => num + start);
  };

  return (
    <div className="pagination">
      <p>Current page: {currentPage}</p>
      <div>
        <button
          className="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            className="button"
            key={pageNumber}
            disabled={currentPage === pageNumber}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="button"
          disabled={totalPages === currentPage}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
