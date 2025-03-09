import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from 'src/components/Pagination/Pagination';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
    useSearchParams: vi.fn(() => [new URLSearchParams({ page: '1' }), vi.fn()]),
    useLocation: vi.fn(() => ({ pathname: '/1' })),
  };
});

describe('Tests for the Pagination component', () => {
  const user = userEvent.setup();

  test('Make sure the component updates URL query parameter when page changes.', async () => {
    render(<Pagination totalPages={5} />);
    expect(screen.getByText(/Current page: 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/1?page=2');
  });

  test('Goes to the next and previous pages', async () => {
    render(<Pagination totalPages={3} />);
    await user.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/1?page=2');
  });

  test('Blocks Prev on the first and Next on the last pages', () => {
    render(<Pagination totalPages={2} />);

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeEnabled();
  });

  test('Correctly displays a shortened list of pages with large TotalPages.', () => {
    render(<Pagination totalPages={10} />);
    expect(screen.queryByText('9')).not.toBeInTheDocument();
  });
});
