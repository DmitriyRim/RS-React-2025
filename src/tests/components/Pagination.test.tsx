import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

describe('Tests for the Pagination component', () => {
  beforeEach(() => {});

  it('Make sure the component updates URL query parameter when page changes.', () => {
    vi.mock('react-router-dom', async () => {
      const mod = await vi.importActual('react-router-dom');
      return {
        ...mod,
        useLoaderData: vi.fn().mockImplementation(() => new URL(location.href)),
      };
    });
    window.history.pushState({}, '', '/?page=1');

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route path="/" element={<Pagination totalPages={5} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Current page: 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/next/i));
    expect(screen.getByText(/Current page: 2/i)).toBeInTheDocument();
  });
});
