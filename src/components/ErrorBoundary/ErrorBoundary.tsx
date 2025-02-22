import { Component, ErrorInfo, ReactNode } from 'react';

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

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error.name, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
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
      <button className="button" onClick={() => this.setState({ error: true })}>
        Error Button
      </button>
    );
  }
}
