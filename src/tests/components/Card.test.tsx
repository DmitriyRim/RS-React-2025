import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../../components/Card/Card';
import { Book } from '../../types/types';
import { Mock } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCard, removeCard } from '../../api/checkedSlice';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: vi.fn().mockReturnValue(''),
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
  selectCheckedCard: () => [],
}));

vi.stubGlobal('fetch', vi.fn());

describe('Tests for the Card component', () => {
  const mockDispatch = vi.fn();
  const data: Book = {
    id: 1,
    title: 'Test',
    formats: {
      'image/jpeg': '',
    },
    summaries: ['test-summary'],
    subjects: [],
    authors: [],
    translators: [],
    bookshelves: [],
    languages: [],
    copyright: null,
    media_type: 'utf-8',
    download_count: 0,
  };
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as Mock).mockReturnValue([]);
  });

  test('Ensure that the card component renders the relevant card data', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    render(<Card value={data as unknown as Book} />);

    expect(screen.getByText(data.title)).toBeInTheDocument();
  });

  test('Validate that clicking on a card opens a detailed card component', () => {
    render(<Card value={data as unknown as Book} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/1');
  });

  test('addCard when clicked, if the card has not been added', async () => {
    render(<Card value={data as unknown as Book} />);

    const label = screen.getByLabelText('Add');
    await user.click(label);

    expect(addCard).toHaveBeenCalledWith(data);
    expect(mockDispatch).toHaveBeenCalledWith(addCard(data));
  });

  test('remove the Card when clicked, if the card has already been added', async () => {
    (useAppSelector as unknown as Mock).mockReturnValue([data]);
    render(<Card value={data as unknown as Book} />);

    const label = screen.getByLabelText('Remove');
    await user.click(label);

    expect(removeCard).toHaveBeenCalledWith(data.id);
    expect(mockDispatch).toHaveBeenCalledWith(removeCard(data.id));
  });
});
