import { render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub, useLoaderData } from 'react-router-dom';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import { useGetDataByIdQuery } from '../../api/apiSlice';
import { Mock } from 'vitest';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useLoaderData: vi.fn(),
  };
});

vi.mock('../../api/apiSlice', async () => {
  const actual = await vi.importActual('../../api/apiSlice');
  return {
    ...actual,
    useGetDataByIdQuery: vi.fn(),
  };
});

describe('Tests for the Detailed Card component', () => {
  beforeEach(() => {
    (useLoaderData as Mock).mockReturnValue(123);
  });

  const Stub = createRoutesStub([
    {
      path: '/:id',
      Component: DetailsCard,
    },
  ]);

  it('Check that a loading indicator is displayed while fetching data', async () => {
    (useGetDataByIdQuery as Mock).mockReturnValue({
      data: {},
      isFetching: true,
      error: null,
    });
    render(<Stub initialEntries={['/123']} />);
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', () => {
    (useGetDataByIdQuery as Mock).mockReturnValue({
      data: {
        id: 123,
        title: 'Test Book',
        authors: [{ name: 'John Doe' }],
        formats: { 'image/jpeg': 'test-image.jpg' },
        summaries: ['A great book'],
        subjects: ['Fiction'],
        bookshelves: ['Bestsellers'],
        languages: ['en'],
        download_count: 42,
      },
      isFetching: false,
      error: null,
    });

    render(<Stub initialEntries={['/123']} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', () => {
    (useGetDataByIdQuery as Mock).mockReturnValue({
      data: {},
      isFetching: false,
      error: null,
    });
    render(<Stub initialEntries={['/11111']} />);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
