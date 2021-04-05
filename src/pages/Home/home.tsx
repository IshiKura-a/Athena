/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, List, Row, Col, Tabs } from 'antd';
import { connect, useIntl } from 'umi';

import styles from './home.less';
import { NotificationProps } from './components/Notifications';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Avatar from 'antd/lib/avatar/avatar';

const { TabPane } = Tabs;
const tabCallBack = (key: any) => {};

const todoData = [
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-05',
  },
];

const lessonData = [
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: 1,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: 1,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: 2,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: 3,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: 4,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: 5,
  },
  {
    name: '',
    startTime: '',
    endTime: '',
    date: 6,
  },
  {
    name: '',
    startTime: '',
    endTime: '',
    date: 7,
  },
];

const homePage: React.FC<NotificationProps> = (props) => {
  console.log(props);
  const { data } = props.data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();
  return (
    <PageContainer>
      <div className="site-card-wrapper">
        <Row gutter={3}>
          <Col span={16}>
            <Card>
              <Alert
                message={intl.formatMessage({
                  id: 'pages.home.alertMessage',
                  defaultMessage: '待办事项',
                })}
                type="info"
                showIcon
                banner
                style={{
                  margin: -12,
                  marginBottom: 24,
                }}
              />
              <List
                className={styles.todo}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                dataSource={todoData}
                renderItem={(item) => (
                  <List.Item>
                    <Card type="inner" title={item.title}>
                      {item.endDate}
                    </Card>
                  </List.Item>
                )}
              ></List>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Alert
                message={intl.formatMessage({
                  id: 'pages.home.alertMessage',
                  defaultMessage: '课程信息',
                })}
                type="info"
                showIcon
                banner
                style={{
                  margin: -12,
                  marginBottom: 24,
                }}
              />
              <Tabs defaultActiveKey="1" onChange={tabCallBack}>
                <TabPane tab="周一" key="1">
                  xxx
                </TabPane>
                <TabPane tab="周二" key="2">
                  xxx
                </TabPane>
                <TabPane tab="周三" key="3">
                  xxx
                </TabPane>
                <TabPane tab="周四" key="4">
                  xxx
                </TabPane>
                <TabPane tab="周五" key="5">
                  xxx
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.home.alertMessage',
            defaultMessage: '最新通知',
          })}
          type="info"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.class}
                description={
                  item.endDate === '' ? item.startDate : `${item.startDate}~${item.endDate}`
                }
              />
              <br />
              {item.content}
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

const mapNotiToProps = (noti: NotificationProps) => {
  return {
    data: noti.data,
  };
};

export default connect(mapNotiToProps)(homePage);
