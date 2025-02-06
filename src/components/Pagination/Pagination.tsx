import { useLoaderData, useNavigate } from 'react-router-dom';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const navigate = useNavigate();
  const url = useLoaderData();
  const pageNumber = url.searchParams.get('page');
  const currentPage = pageNumber ? +pageNumber : 1;
  const minPageNumber = 5;

  const goToPage = (pageNumber: number) => {
    url.searchParams.set('page', `${pageNumber}`);
    navigate(url.search);
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

        {[...Array(totalPages).keys()]
          .slice(
            currentPage < minPageNumber ? 0 : currentPage,
            currentPage + minPageNumber
          )
          .map((num) => (
            <button
              key={num}
              disabled={num + 1 === currentPage}
              onClick={() => goToPage(num + 1)}
            >
              {num + 1}
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
