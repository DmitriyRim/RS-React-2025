import { render, screen } from '@testing-library/react';
import CardList from 'src/components/CardList/CardList';
import { ResponseBooks } from 'src/types/types';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('src/store/store', async () => {
  const actual =
    await vi.importActual<typeof import('src/store/store')>('src/store/store');
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

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    useLocation: vi.fn(),
  };
});

vi.mock('src/store/hooks', async () => {
  const actual = await vi.importActual('src/store/hooks');
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
  };
});

vi.mock('src/api/checkedSlice', () => ({
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
  test('Verify that the component renders the specified number of cards', () => {
    render(<CardList result={data as unknown as ResponseBooks} />);

    expect(screen.getAllByText(/test/i).length).toBe(2);
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    render(
      <CardList
        result={{ count: 0, results: [] } as unknown as ResponseBooks}
      />
    );

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  test('The required number of cards is displayed', async () => {
    render(<CardList result={data as unknown as ResponseBooks} />);

    expect(screen.getAllByText(/test/i).length).toBe(2);
  });
});
