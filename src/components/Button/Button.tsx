import { Component } from 'react';
import './Button.css';

export default class Button extends Component<{
  value: string;
  onClick: () => void;
}> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.value}</button>;
  }
}
