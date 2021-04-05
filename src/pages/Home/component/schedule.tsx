import React, { Component } from 'react';
import { Lesson, timeFormat } from '@/pages/Home/type';
import { Card, Input, TimePicker } from 'antd';
import moment from 'moment';
import styles from './style.less';

interface ScheduleProps {
  lessonInfo: Lesson[];
}

export default class Schedule extends Component<ScheduleProps, any> {
  render() {
    const { lessonInfo } = this.props;
    return (
      <>
        {lessonInfo.map((item: Lesson) => (
          <Card title={item.name} key={`${item.name}${item.startTime}`}>
            <TimePicker.RangePicker
              defaultValue={[moment(item.startTime, timeFormat), moment(item.endTime, timeFormat)]}
              disabled
            />
          </Card>
        ))}
      </>
    );
  }
}
