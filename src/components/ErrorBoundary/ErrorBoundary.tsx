import { Component, ReactNode } from 'react';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export class ErrorButton extends Component {
  state = {
    error: false,
  };
  render() {
    if (this.state.error) {
      throw Error;
    }
    return (
      <button onClick={() => this.setState({ error: true })}>
        Error Button
      </button>
    );
  }
}
