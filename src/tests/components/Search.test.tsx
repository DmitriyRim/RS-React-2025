import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Search from 'src/components/Search/Search';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Verify that clicking the Search button saves the entered value to the local storage.', async () => {
    const router = createMemoryRouter([{ path: '/', element: <Search /> }], {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.click(button);

    expect(window.localStorage.getItem('searchQuery')).toBe('test value');
  });

  test('Check that the component retrieves the value from the local storage upon mounting.', () => {
    const testValue = 'Test';
    localStorage.setItem('searchQuery', testValue);
    const router = createMemoryRouter([{ path: '/', element: <Search /> }], {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLInputElement>('searchbox').value).toBe(
      testValue
    );
  });
});
