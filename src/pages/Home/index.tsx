import { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Row, Col, Tabs } from 'antd';
import type HomePageStore from '@/pages/Home/model';
import { inject, observer } from 'mobx-react';
import type { Lesson } from '@/pages/Home/type';
import { Day } from '@/pages/Home/type';
import Schedule from '@/pages/Home/component/schedule';
import TodoList from '@/components/TodoList';
import moment from 'moment';
import styles from './home.less';

const { TabPane } = Tabs;
const tabCallBack = (key: any) => {};

interface HomePageProps {
  homePageStore: HomePageStore;
}

export function cmpTime(timeA: string, timeB: string, format: string): number {
  const A = moment(timeA, format);
  const B = moment(timeB, format);
  return A.diff(B);
}

@inject('homePageStore')
@observer
export default class HomePage extends Component<HomePageProps, any> {
  async componentDidMount() {
    await this.props.homePageStore.fetchLessonInfo();
  }

  render() {
    const { lessonInfo, week } = this.props.homePageStore;

    return (
      <PageContainer>
        <div className="site-card-wrapper">
          <Row gutter={6}>
            <Col span={15}>
              <Card title={<Alert message="课程信息" type="info" showIcon banner />}>
                <Tabs defaultActiveKey={Day.Mon} centered={false} onChange={tabCallBack}>
                  {Object.values(Day).map((item, index) => {
                    return (
                      <TabPane tab={item.toString()} key={item}>
                        <Card className={styles.tabPane}>
                          <Schedule
                            day={index}
                            lessonInfo={lessonInfo
                              .filter((lesson: Lesson) => {
                                return week.get(item) === lesson.day;
                              })
                              .sort((x, y) => cmpTime(x.start_time, y.start_time, 'HH:mm'))}
                          />
                        </Card>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </Card>
            </Col>
            <Col span={9}>
              <Card title={<Alert message={'待办事项'} type="info" showIcon banner />}>
                <TodoList />
              </Card>
            </Col>
          </Row>
        </div>
        <br />
        <Card title={<Alert message="最新通知" type="info" showIcon banner />}>// TODO</Card>
      </PageContainer>
    );
  }
}
