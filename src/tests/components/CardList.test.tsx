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

vi.mock('../../app/hooks', async () => {
  const actual = await vi.importActual('../../app/hooks');
  return {
    ...actual,
    useAppSelector: vi.fn().mockReturnValue([]),
    useAppDispatch: vi.fn(),
  };
});

describe('Tests for the Card List component', () => {
  const data = {
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
  };

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: CardList,
    },
  ]);

  test('Verify that the component renders the specified number of cards', async () => {
    (useGetDataQuery as Mock).mockReturnValue(data);
    render(<Stub initialEntries={['/']} />);
    await waitFor(() => {
      expect(screen.getAllByText(/test/i).length).toBe(2);
    });
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    (useGetDataQuery as Mock).mockReturnValue({
      data: { count: 0, results: [] },
    });

    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  test('If there is a Error.', async () => {
    (useGetDataQuery as Mock).mockReturnValue({
      error: new Error('test Error'),
    });

    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('test Error')).toBeInTheDocument();
    });
  });

  test('If there is a FetchBaseQueryError error.', async () => {
    (useGetDataQuery as Mock).mockReturnValue({
      error: {
        status: 404,
        data: 'test',
        error: 'Error 2',
      },
    });

    render(<Stub initialEntries={['/']} />);
    expect(screen.getByText(/error 2/i)).toBeInTheDocument();
  });

  test('1', async () => {
    (useGetDataQuery as Mock).mockReturnValue(data);
    render(<Stub initialEntries={['/']} />);
    await waitFor(() => {
      expect(screen.getAllByText(/test/i).length).toBe(2);
    });
  });
});
