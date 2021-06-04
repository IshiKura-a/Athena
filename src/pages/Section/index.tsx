import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import type SectionStore from '@/pages/Section/model';
import StudentFeatList from './component/StudentFeatList';
import InstructorFeatList from './component/InstructorFeatList';

interface SectionProps {
  sectionStore: SectionStore;
}

@inject('sectionStore')
@observer
export default class Profile extends Component<SectionProps, any> {
  render() {
    const { sectionStore } = this.props;
    return (
      <Row gutter={2}>
        <Col span={18}>
          <Card>
            {sectionStore.baseStore.type === 'student' ? (
              <StudentFeatList />
            ) : (
              <InstructorFeatList />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>课程列表</Card>
        </Col>
      </Row>
    );
  }
}
