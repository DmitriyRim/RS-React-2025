import { render, screen } from '@testing-library/react';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import { Mock } from 'vitest';
import { useLoader } from '../../hooks/useLoader';
import { Book } from '../../types/types';

vi.mock('../../hooks/useLoader', async () => {
  const actual = await vi.importActual('../../hooks/useLoader');
  return {
    ...actual,
    useLoader: vi.fn(),
  };
});

describe('Tests for the Detailed Card component', () => {
  const resultsData: { data: Book } = {
    data: {
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
    },
  };

  test('Check that a loading indicator is displayed while fetching data', () => {
    (useLoader as Mock).mockReturnValue(true);
    render(<DetailsCard results={resultsData} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', () => {
    (useLoader as Mock).mockReturnValue(false);
    render(<DetailsCard results={resultsData} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', () => {
    (useLoader as Mock).mockReturnValue(false);
    render(<DetailsCard results={{} as { data: Book }} />);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
