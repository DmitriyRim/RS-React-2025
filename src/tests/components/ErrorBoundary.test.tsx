import { render, screen } from '@testing-library/react';
import ErrorBoundary, {
  ErrorButton,
} from '../../components/ErrorBoundary/ErrorBoundary';
import userEvent from '@testing-library/user-event';

describe('ErrorBoundary', () => {
  test('Render ErrorBoundary', () => {
    render(
      <ErrorBoundary fallback={<p>Test</p>}>
        <button>Test header</button>
      </ErrorBoundary>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Render ErrorBoundary with error', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary fallback={<p>UI</p>}>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('UI')).toBeInTheDocument();
  });
});
