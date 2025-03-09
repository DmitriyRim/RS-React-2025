import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DetailsCard from 'src/components/DetailsCard/DetailsCard';
import { Book } from 'src/types/types';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

describe('Tests for the Detailed Card component', () => {
  const resultsData: Book = {
    id: 123,
    title: 'Test Book',
    authors: [
      {
        name: 'John Doe',
        birth_year: null,
        death_year: null,
      },
    ],
    formats: { 'image/jpeg': 'test-image.jpg' },
    summaries: ['A great book'],
    subjects: ['Fiction'],
    bookshelves: ['Bestsellers'],
    languages: ['en'],
    download_count: 42,
    translators: [],
    copyright: null,
    media_type: '',
  };

  test('Make sure the detailed card component correctly displays the detailed card data', () => {
    render(
      <MemoryRouter>
        <DetailsCard result={resultsData} />
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', () => {
    render(<DetailsCard result={{} as Book} />);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
