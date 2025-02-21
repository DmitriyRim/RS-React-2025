import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

describe('Tests for the Pagination component', () => {
  const user = userEvent.setup();

  test('Make sure the component updates URL query parameter when page changes.', async () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={5} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Current page: 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/Current page: 2/i)).toBeInTheDocument();
  });

  test('Goes to the next and previous pages', async () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={3} />
      </MemoryRouter>
    );
    await user.click(screen.getByText('Next'));
    expect(screen.getByText(/Current page: 2/)).toBeInTheDocument();

    await user.click(screen.getByText('Next'));
    expect(screen.getByRole('button', { name: /3/i })).toBeDisabled();

    await user.click(screen.getByText('Prev'));
    expect(screen.getByText(/Current page: 2/)).toBeInTheDocument();
  });

  test('Blocks Prev on the first and Next on the last pages', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={2} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeEnabled();
  });

  test('Correctly displays a shortened list of pages with large TotalPages.', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={10} />
      </MemoryRouter>
    );
    expect(screen.queryByText('9')).not.toBeInTheDocument();
  });
});
