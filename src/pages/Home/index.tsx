import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, List, Row, Col, Tabs } from 'antd';
import styles from './home.less';
import HomePageStore from '@/pages/Home/model';
import { inject, observer } from 'mobx-react';
import { Day, Lesson } from '@/pages/Home/type';
import Schedule from '@/pages/Home/component/schedule';

const { TabPane } = Tabs;
const tabCallBack = (key: any) => {};

interface HomePageProps {
  homePageStore: HomePageStore;
}

@inject('homePageStore')
@observer
export default class HomePage extends Component<HomePageProps, any> {
  handleChangeToDoPage = (val: number) => {
    this.props.homePageStore.setToDoPage(val);
  };

  render() {
    const { todoList, lessonInfo, msg, todoPage } = this.props.homePageStore;
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
              <Card title={<Alert message={'待办事项'} type="info" showIcon banner />}>
                <List
                  className={styles.todo}
                  dataSource={todoList}
                  pagination={{
                    defaultCurrent: 1,
                    current: todoPage,
                    onChange: this.handleChangeToDoPage,
                    pageSize: 3,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <Card type="inner" title={item.title}>
                        {item.endDate}
                      </Card>
                    </List.Item>
                  )}
                />
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
