import { render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';
import { Mock } from 'vitest';
import CardList from '../../components/CardList/CardList';
import { useGetDataQuery } from '../../api/apiSlice';

vi.mock('../../api/apiSlice', async () => {
  const actual = await vi.importActual('../../api/apiSlice');
  return {
    ...actual,
    useGetDataQuery: vi.fn(),
  };
});

describe('Tests for the Card List component', () => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: CardList,
    },
  ]);

  it('Verify that the component renders the specified number of cards', async () => {
    (useGetDataQuery as Mock).mockReturnValue({
      data: {
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
      },
      isFetching: false,
      error: null,
    });
    render(<Stub initialEntries={['/']} />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getAllByText(/test/i).length).toBe(2);
    });
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    (useGetDataQuery as Mock).mockReturnValue({
      data: { count: 0, results: [] },
    });

    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
});
