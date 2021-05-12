import { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Row, Col, Tabs } from 'antd';
import type HomePageStore from '@/pages/Home/model';
import { inject, observer } from 'mobx-react';
import type { Lesson } from '@/pages/Home/type';
import { Day } from '@/pages/Home/type';
import Schedule from '@/pages/Home/component/schedule';
import TodoList from '@/pages/Home/component/todoList';
import moment from 'moment';

const { TabPane } = Tabs;
const tabCallBack = (key: any) => {
  console.log(key);
};

interface HomePageProps {
  homePageStore: HomePageStore;
}

@inject('homePageStore')
@observer
export default class HomePage extends Component<HomePageProps, any> {
  componentDidMount() {
    this.props.homePageStore.fetchLessonInfo();
  }

  cmpTime = (timeA: string, timeB: string) => {
    const A = moment(timeA, 'HH:mm');
    const B = moment(timeB, 'HH:mm');
    return A.diff(B);
  };

  render() {
    const { lessonInfo } = this.props.homePageStore;
    return (
      <PageContainer>
        <div className="site-card-wrapper">
          <Row gutter={3}>
            <Col span={16}>
              <Card title={<Alert message="课程信息" type="info" showIcon banner />}>
                <Tabs defaultActiveKey={Day.Mon} onChange={tabCallBack}>
                  {Object.values(Day).map((item, index) => {
                    return (
                      <TabPane tab={item.toString()} key={item}>
                        <Card style={{ height: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                          <Schedule
                            day={index}
                            lessonInfo={lessonInfo
                              .filter((lesson: Lesson) => {
                                return lesson.date === item;
                              })
                              .sort((x, y) => this.cmpTime(x.startTime, y.startTime))}
                          />
                        </Card>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </Card>
            </Col>
            <Col span={8}>
              <TodoList homePageStore={this.props.homePageStore} />
            </Col>
          </Row>
        </div>
        <br />
        <Card title={<Alert message="最新通知" type="info" showIcon banner />}>// TODO</Card>
      </PageContainer>
    );
  }
}
