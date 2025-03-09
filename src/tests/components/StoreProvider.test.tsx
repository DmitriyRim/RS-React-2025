import { makeStore } from 'src/store/store';
import StoreProvider from 'src/store/StoreProvider';
import { Mock } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('src/store/store', () => ({
  makeStore: vi.fn(),
}));

describe('StoreProvider', () => {
  it('should render children wrapped with Provider', () => {
    const mockStore = {
      dispatch: vi.fn(),
      getState: vi.fn(),
      subscribe: vi.fn(),
    };
    (makeStore as Mock).mockReturnValue(mockStore);

    const { getByText } = render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
