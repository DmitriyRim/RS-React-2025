import { render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub, useLoaderData } from 'react-router-dom';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import { getData } from '../../services/api';
import { Mock } from 'vitest';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useLoaderData: vi.fn(),
  };
});

vi.mock('../../services/api', () => ({
  getData: vi.fn(),
}));

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
    vi.mocked(getData).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(''), 100))
    );
    (getData as Mock).mockResolvedValue({});
    render(<Stub initialEntries={['/123']} />);
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    (getData as Mock).mockResolvedValue({
      id: 123,
      title: 'Test Book',
      authors: [{ name: 'John Doe' }],
      formats: { 'image/jpeg': 'test-image.jpg' },
      summaries: ['A great book'],
      subjects: ['Fiction'],
      bookshelves: ['Bestsellers'],
      languages: ['en'],
      download_count: 42,
    });

    render(<Stub initialEntries={['/11111']} />);
    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    (getData as Mock).mockResolvedValue({});
    render(<Stub initialEntries={['/11111']} />);
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
});
