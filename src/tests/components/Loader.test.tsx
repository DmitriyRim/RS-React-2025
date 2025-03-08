import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader/Loader';

describe('Render Loader', () => {
  test('Show error page', () => {
    render(<Loader />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
