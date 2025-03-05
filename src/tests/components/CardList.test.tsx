import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import CardList from '../../components/CardList/CardList';
import { ResponseBooks } from '../../types/types';
import { useLoader } from '../../hooks/useLoader';

vi.mock('../../hooks/useLoader', async () => {
  const actual = await vi.importActual('../../hooks/useLoader');
  return {
    ...actual,
    useLoader: vi.fn(),
  };
});

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
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

  test('Verify that the component renders the specified number of cards', () => {
    (useLoader as Mock).mockReturnValue(false);
    render(<CardList data={data as unknown as ResponseBooks} />);

    expect(screen.getAllByText(/test/i).length).toBe(2);
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    (useLoader as Mock).mockReturnValue(false);
    render(
      <CardList data={{ count: 0, results: [] } as unknown as ResponseBooks} />
    );

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  test('The required number of cards is displayed', async () => {
    (useLoader as Mock).mockReturnValue(false);
    render(<CardList data={data as unknown as ResponseBooks} />);

    expect(screen.getAllByText(/test/i).length).toBe(2);
  });
});
