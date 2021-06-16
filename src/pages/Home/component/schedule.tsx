import { Component } from 'react';
import type { Lesson } from '@/pages/Home/type';
import { Timeline, Tooltip } from 'antd';
import moment from 'moment';
import styles from './style.less';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { timeFormat } from '@/pages/Home/type';

interface ScheduleProps {
  lessonInfo: Lesson[];
  day: number;
}

@observer
export default class Schedule extends Component<ScheduleProps, any> {
  judgeFinish = (startTime: string, endTime: string) => {
    const nowString = moment().format('HH:mm');
    const now = moment(nowString, 'HH:mm');
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');

    const started = now.diff(start);
    const ended = end.diff(now);

    if (moment().weekday() === this.props.day) {
      if (ended >= 0) {
        if (started >= 0) {
          return 'red';
        }
        return 'green';
      }
      return 'yellow';
    }
    return 'grey';
  };
  render() {
    const { lessonInfo } = this.props;
    return (
      <Timeline mode="alternate">
        {lessonInfo.map((item: Lesson) => (
          <Timeline.Item
            key={`${item.course_name}${item.start_time}`}
            label={
              <div className={styles.blockMargin}>
                <div className={styles.schedTime}>
                  {`${moment(item.start_time, timeFormat).format('HH:mm')}
                    ~
                    ${moment(item.end_time, timeFormat).format('HH:mm')}`}
                </div>
                <div>{item.location}</div>
              </div>
            }
            dot={
              <FieldTimeOutlined
                style={{ fontSize: 20, color: this.judgeFinish(item.start_time, item.end_time) }}
              />
            }
          >
            <div className={styles.infoBorder}>
              <span>
                <a className={styles.link}>{item.course_name}</a>
              </span>
              <div>
                <span>
                  <Tooltip title={item.instructor ? item.instructor : 'xxx'}>
                    <UserOutlined />
                  </Tooltip>
                </span>
                {item.department ? item.department : 'hhhhhh学院'}
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }
}
