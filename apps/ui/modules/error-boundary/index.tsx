import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

export class ErrorBoundary extends Component<PropsWithChildren> {
  state: Readonly<{ error: Error; errorInfo: ErrorInfo }> = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    const { error: e, errorInfo: i } = this.state;
    if (e) {
      return <div>The error is happened!</div>;
    }
    return <>{this.props.children}</>;
  }
}
