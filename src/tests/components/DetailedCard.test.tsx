import { render, screen } from '@testing-library/react';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import { Book } from '../../types/types';

const mockDispatch = vi.fn();

vi.mock('../../store/store', async () => {
  const actual =
    await vi.importActual<typeof import('../../store/store')>(
      '../../store/store'
    );
  return {
    ...actual,
    makeStore: vi.fn(() => ({
      dispatch: mockDispatch,
      getState: vi.fn(() => ({})),
      subscribe: vi.fn(),
      replaceReducer: vi.fn(),
    })),
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

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    mockDispatch.mockResolvedValue(resultsData);

    const jsx = await DetailsCard({ id: { id: '1' } });
    render(jsx);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    mockDispatch.mockResolvedValue({});

    const jsx = await DetailsCard({ id: { id: '1' } });
    render(jsx);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
