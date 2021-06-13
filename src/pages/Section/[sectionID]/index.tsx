import { Component } from 'react';
import { Card, Col, List, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import type SectionStore from '@/pages/Section/[sectionID]/model';
import type { LessonReq } from '@/pages/Home/type';
import StudentFeat from '../component/StudentFeat';
import InstructorFeat from '../component/InstructorFeat';

interface SectionProps {
  sectionStore: SectionStore;
}

@inject('sectionStore')
@observer
export default class Section extends Component<SectionProps, any> {
  async componentDidMount() {
    const { sectionStore } = this.props;
    const { sectionID } = this.props.match.params;

    await sectionStore.fectchLessonList();
    sectionStore.handleRoute(sectionID);

    sectionStore.setModalVisible(false);
    sectionStore.setHandInModalVisible(false);
    sectionStore.setCheckModalVisible(false);
    sectionStore.setPolling(false);
    sectionStore.setIsSign(undefined);
    sectionStore.setSignInShow(undefined);
  }

  redirectToSection = (id: string) => {
    this.props.sectionStore.redirectRoute(id);
  };

  render() {
    const { sectionStore } = this.props;

    return (
      <Row gutter={2}>
        <Col span={18}>
          <Card>
            {sectionStore.baseStore.type === 'student' ? (
              <StudentFeat sectionStore={this.props.sectionStore} />
            ) : (
              <InstructorFeat sectionStore={this.props.sectionStore} />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <List
              dataSource={sectionStore.lessonList}
              renderItem={(item: LessonReq) => (
                <List.Item onClick={this.redirectToSection.bind(this, item.course_id)}>
                  <span>{item.course_name}</span>
                  <span>{item.instructor}</span>
                  <span>{item.department}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
