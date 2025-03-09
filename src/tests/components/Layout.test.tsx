import { render, screen } from '@testing-library/react';
import Layout from 'src/components/Layout/layout';
import StoreProvider from 'src/store/StoreProvider';
import { vi } from 'vitest';

vi.mock('src/components/Search/Search', () => ({
  __esModule: true,
  default: () => <div>Search</div>,
}));

vi.mock('src/components/ThemeButton/ThemeButton', () => ({
  __esModule: true,
  ThemeButton: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Switch Theme</button>
  ),
}));

vi.mock('src/components/Popup/Popup', () => ({
  __esModule: true,
  Popup: () => <div>Popup</div>,
}));

vi.mock('src/components/ErrorBoundary/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ErrorButton: () => <button>Error Button</button>,
}));

vi.mock('src/store/themeContext', () => ({
  useThemeContext: vi.fn(() => ({
    theme: 'light',
    handleSwitchTheme: vi.fn(),
  })),
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  },
}));

describe('Layout Component', () => {
  test('renders correctly with children and context', () => {
    render(
      <StoreProvider>
        <Layout>
          <div>Child Component</div>
        </Layout>
      </StoreProvider>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Switch Theme')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByText('Popup')).toBeInTheDocument();
    expect(screen.getByText('Error Button')).toBeInTheDocument();
  });
});
