import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeButton } from '../../components/ThemeButton/ThemeButton';
import { useContext } from 'react';
import { Mock } from 'vitest';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('ThemeButton', () => {
  test('Switching themes', async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();

    (useContext as Mock).mockReturnValue({
      theme: 'dark',
      setTheme,
    });

    render(<ThemeButton />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(setTheme).toHaveBeenCalled();
  });
});
