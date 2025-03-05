import { renderHook } from '@testing-library/react';
import { useLoader } from '../../hooks/useLoader';
import { Mock, vi } from 'vitest';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('useLoader', () => {
  test('should return false on initial rendering', () => {
    (useRouter as Mock).mockReturnValue({
      asPath: '/',
      pathname: '/',
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
    });

    const { result } = renderHook(() => useLoader());
    expect(result.current).toBe(false);
  });
});
