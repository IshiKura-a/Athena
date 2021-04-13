import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, List, Row, Col, Tabs } from 'antd';
import styles from './home.less';
import HomePageStore from '@/pages/Home/model';
import { inject, observer } from 'mobx-react';
import { Day, Lesson } from '@/pages/Home/type';
import Schedule from '@/pages/Home/component/schedule';
import TodoList from './component/todolist';

const { TabPane } = Tabs;
const tabCallBack = (key: any) => {};

export interface HomePageProps {
  homePageStore: HomePageStore;
}

@inject('homePageStore')
@observer
export default class HomePage extends Component<HomePageProps, any> {
  render() {
    const {todoList, lessonInfo, msg } = this.props.homePageStore;
    return (
      <PageContainer>
        <div className="site-card-wrapper">
          <Row gutter={3}>
            <Col span={16}>
              <Card title={<Alert message="课程信息" type="info" showIcon banner />}>
                <Tabs defaultActiveKey={Day.Mon} onChange={tabCallBack}>
                  {Object.values(Day).map((item) => {
                    return (
                      <TabPane tab={item.toString()} key={item}>
                        <Schedule
                          lessonInfo={lessonInfo.filter((lesson: Lesson) => {
                            return lesson.date === item;
                          })}
                        />
                      </TabPane>
                    );
                  })}
                </Tabs>
              </Card>
            </Col>
            <Col span={8}>
              <TodoList homePageStore={this.props.homePageStore}/>
            </Col>
          </Row>
        </div>
        <br />
        <Card title={<Alert message="最新通知" type="info" showIcon banner />}>// TODO</Card>
      </PageContainer>
    );
  }
}
