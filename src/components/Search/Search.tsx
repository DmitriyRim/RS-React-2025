import { Component, ReactNode } from 'react';
import './Search.css';

type Props = {
  value: string | number;
  onChange: (e: { target: { value: string } }) => void;
};

export default class Search extends Component<Props> {
  render(): ReactNode {
    return (
      <input
        className="search"
        type="text"
        placeholder="Search..."
        onChange={this.props.onChange}
        value={this.props.value}
      />
    );
  }
}
