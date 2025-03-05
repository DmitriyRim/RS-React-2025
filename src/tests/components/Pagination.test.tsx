import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';

const mockPush = vi.fn();
vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(vi.fn(() => ({ push: mockPush, query: 1 }))),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
  };
});

describe('Tests for the Pagination component', () => {
  const user = userEvent.setup();

  test('Make sure the component updates URL query parameter when page changes.', async () => {
    render(<Pagination totalPages={5} />);
    expect(screen.getByText(/Current page: 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/?page=2');
  });

  test('Goes to the next and previous pages', async () => {
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams('page=1'));
    render(<Pagination totalPages={3} />);
    await user.click(screen.getByText('Next'));
    expect(mockPush).toHaveBeenCalledWith('/?page=2');
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
