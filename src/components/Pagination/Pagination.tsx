import { useLoaderData, useNavigate } from 'react-router-dom';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const navigate = useNavigate();
  const url = useLoaderData();
  const pageNumber = url.searchParams.get('page');
  const currentPage = pageNumber ? +pageNumber : 1;
  const maxPageNumbers = 5;

  const goToPage = (pageNumber: number) => {
    url.searchParams.set('page', `${pageNumber}`);
    navigate(url.search);
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
    <div>
      <p>Current page: {currentPage}</p>
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={currentPage === pageNumber}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          disabled={totalPages === currentPage}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
