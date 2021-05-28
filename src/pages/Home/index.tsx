import { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Row, Col, Tabs } from 'antd';
import type HomePageStore from '@/pages/Home/model';
import { inject, observer } from 'mobx-react';
import type { Lesson } from '@/pages/Home/type';
import { Day, week } from '@/pages/Home/type';
import Schedule from '@/pages/Home/component/schedule';
import TodoList from '@/components/TodoList';
import moment from 'moment';
import { cloneDeep } from 'lodash';

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
  async componentDidMount() {
    await this.props.homePageStore.fetchLessonInfo();
  }

  cmpTime = (lessonA: Lesson, lessonB: Lesson, day: number) => {
    const timeA = lessonA.time.find((item) => {
      return item.day === day;
    });
    const timeB = lessonB.time.find((item) => {
      return item.day === day;
    });
    if (timeA !== undefined && timeB !== undefined) {
      const A = moment(timeA.start_time, 'HH:mm');
      const B = moment(timeB.start_time, 'HH:mm');
      return A.diff(B);
    }
    return 0;
  };

  handlePassLesson = (lessons: Lesson[], day) => {
    let newLesson: Lesson[] = [];
    lessons.filter((lesson: Lesson) => {
      const check = lesson.time.find((item) => {
        return item.day === day;
      });
      if (check !== undefined) {
        const rightLesson = cloneDeep(lesson);
        newLesson.push(rightLesson);
        return true;
      }
      return false;
    });

    // console.log('filterLesson', newLesson);

    for (let i = 0; i < newLesson.length; i += 1) {
      const item = newLesson[i];
      item.time = [];

      const newTime = item.time.find(function (it) {
        return it.day === day;
      });
      if (newTime !== undefined) {
        item.time.push(newTime);
      }
    }

    newLesson = newLesson.sort((x, y) => this.cmpTime(x, y, day));
    return newLesson;
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
                            lessonInfo={this.handlePassLesson(lessonInfo, week.get(item))}
                          />
                        </Card>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </Card>
            </Col>
            <Col span={8}>
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
