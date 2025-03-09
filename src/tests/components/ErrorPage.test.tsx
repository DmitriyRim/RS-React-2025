import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ErrorPage from '~/routes/404';

describe('Error page', () => {
  test('Show error page', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });

  test('Render link to main page', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/back/i)).toHaveAttribute('href', '/');
  });
});
