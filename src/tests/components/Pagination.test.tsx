import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

describe('Tests for the Pagination component', () => {
  beforeEach(() => {});

  it('Make sure the component updates URL query parameter when page changes.', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route path="/" element={<Pagination totalPages={5} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Current page: 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => {
      expect(screen.getByText(/Current page: 2/i)).toBeInTheDocument();
      screen.debug();
    });
  });
});
