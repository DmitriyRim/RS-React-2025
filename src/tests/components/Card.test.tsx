import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { Book } from '../../types/types';

const fakeFetch = vi.fn();
vi.stubGlobal('fetch', fakeFetch);

describe('Tests for the Card component', () => {
  const data = {
    id: 1,
    title: 'Test',
    formats: {
      'image/jpeg': '',
    },
    summaries: ['test-summary'],
  };

  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Card value={data as unknown as Book} />
      </MemoryRouter>
    );

    expect(screen.getByText(data.title)).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', () => {
    render(
      <MemoryRouter>
        <Card value={data as unknown as Book} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/1');
  });
});
