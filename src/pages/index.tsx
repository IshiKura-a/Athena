import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import stores from './store';

export default class Base extends Component {
  render() {
    console.log('render', this.props.children);
    return <Provider {...stores}>{this.props.children}</Provider>;
  }
}
