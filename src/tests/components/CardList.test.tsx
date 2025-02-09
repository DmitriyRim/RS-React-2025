import { render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub, useLoaderData } from 'react-router-dom';
import { getData } from '../../services/api';
import { Mock } from 'vitest';
import CardList from '../../components/CardList/CardList';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useLoaderData: vi.fn(),
  };
});

vi.mock('../../services/api', () => ({
  getData: vi.fn(),
}));

describe('Tests for the Card List component', () => {
  beforeEach(() => {
    (useLoaderData as Mock).mockReturnValue({ search: '' });
  });
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: CardList,
    },
  ]);
  it('Verify that the component renders the specified number of cards', async () => {
    (getData as Mock).mockResolvedValue({
      count: 1,
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
    });
    render(<Stub initialEntries={['/']} />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getAllByText(/test/i).length).toBe(2);
    });
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    (getData as Mock).mockResolvedValue({ count: 0, results: [] });

    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
});
