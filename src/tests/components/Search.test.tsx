import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../../components/Search/Search';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Verify that clicking the Search button saves the entered value to the local storage.', async () => {
    render(<Search />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.click(button);

    expect(window.localStorage.getItem('searchQuery')).toBe('test value');
  });

  test('Check that the component retrieves the value from the local storage upon mounting.', () => {
    const testValue = 'Test';
    localStorage.setItem('searchQuery', testValue);
    render(<Search />);

    expect(screen.getByRole<HTMLInputElement>('searchbox').value).toBe(
      testValue
    );
  });
});
