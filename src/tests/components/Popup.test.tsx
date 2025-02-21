import { render, screen } from '@testing-library/react';
import { Popup } from '../../components/Popup/Popup';
import { useAppSelector } from '../../app/hooks';
import { Mock } from 'vitest';
import { convertToCsv, createBlobUrl } from '../../utils/utils';
import { Book } from '../../types/types';

vi.mock('../../app/hooks', async () => {
  const actual = await vi.importActual('../../app/hooks');
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
  };
});

const mockCreateObjectURL = vi.fn().mockReturnValue('blob');
URL.createObjectURL = mockCreateObjectURL;
describe('Popup', () => {
  test('Popup is hidden if there are no selected items.', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    render(<Popup />);

    expect(screen.queryByText(/items are selected/i)).toBeNull();
  });

  test('Popup is visible when adding an item.', () => {
    (useAppSelector as unknown as Mock).mockReturnValue([{}]);
    render(<Popup />);

    expect(screen.getByText(/items are selected/i)).toBeInTheDocument();
  });
});
