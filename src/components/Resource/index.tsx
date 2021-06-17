import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { ResourceStore } from './model';

interface ResourceProps {
  discussionStore: ResourceStore;
}

@inject('resourceStore')
@observer
export default class Discussion extends Component<ResourceProps> {
  ref: React.RefObject<any>;

  constructor(props: ResourceProps) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <>
        <p>test</p>
      </>
    );
  }
}
