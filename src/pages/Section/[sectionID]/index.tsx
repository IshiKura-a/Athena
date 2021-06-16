import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import StudentFeat from '../component/Student/StudentFeat';
import InstructorFeat from '../component/Instructor/InstructorFeat';
import { RoleType } from '@/pages/Login/model';
import type { BaseStore } from '@/store';
import { observable } from 'mobx';

interface IProps {
  baseStore: BaseStore;
}

@inject('baseStore')
@observer
export default class Section extends Component<IProps, any> {
  @observable sectionID = undefined as string | undefined;

  componentDidMount() {
    const { sectionID } = this.props.match.params;
    this.sectionID = sectionID;
  }

  render() {
    const { baseStore } = this.props;

    return (
      <>
        {baseStore.type === RoleType.student ? (
          <StudentFeat sectionID={this.sectionID} />
        ) : (
          <InstructorFeat sectionID={this.sectionID} />
        )}
      </>
    );
  }
}
