import { render, screen } from '@testing-library/react';
import CardList from '../../components/CardList/CardList';

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

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: vi.fn(() => new URLSearchParams('')),
    useRouter: vi.fn(),
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

vi.mock('../../store/hooks', async () => {
  const actual = await vi.importActual('../../store/hooks');
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
  };
});

vi.mock('../../api/checkedSlice', () => ({
  addCard: vi.fn(),
  removeCard: vi.fn(),
  selectCheckedCard: vi.fn(() => []),
}));

describe('Tests for the Card List component', () => {
  const data = {
    count: 2,
    results: [
      {
        id: 123,
        title: 'Test1',
        summaries: '',
        formats: {
          'image/jpeg': '',
        },
      },
      {
        id: 124,
        title: 'Test2',
        summaries: '',
        formats: {
          'image/jpeg': '',
        },
      },
    ],
  };
  test('Verify that the component renders the specified number of cards', async () => {
    mockDispatch.mockResolvedValue({ data });

    const jsx = await CardList({ queryParams: { page: '', search: '' } });
    render(jsx);
    expect(screen.getAllByText(/test/i).length).toBe(2);
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    mockDispatch.mockResolvedValue({ data: { count: 0, results: [] } });

    const jsx = await CardList({ queryParams: { page: '', search: '' } });
    render(jsx);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  test('The required number of cards is displayed', async () => {
    mockDispatch.mockResolvedValue({ data });

    const jsx = await CardList({ queryParams: { page: '', search: '' } });
    render(jsx);

    expect(screen.getAllByText(/test/i).length).toBe(2);
  });
});
