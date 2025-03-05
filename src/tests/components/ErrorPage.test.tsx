import { render, screen } from '@testing-library/react';
import ErrorPage from '../../pages/404';

describe('Error page', () => {
  test('Show error page', () => {
    render(<ErrorPage />);

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });

  test('Render link to main page', () => {
    render(<ErrorPage />);

    expect(screen.getByText(/back/i)).toHaveAttribute('href', '/');
  });
});
