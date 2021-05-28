import { Component } from 'react';
import type { Lesson } from '@/pages/Home/type';
import { Timeline, Tooltip } from 'antd';
import moment from 'moment';
import styles from './style.less';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';

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
            key={`${item.course_name}${item.time[0].start_time}`}
            label={
              <div style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <div style={{ fontSize: 16, fontWeight: 500, textDecoration: 'underline' }}>
                  bug!!!
                </div>
                <div>{item.address}</div>
              </div>
            }
            dot={<FieldTimeOutlined style={{ fontSize: 20, color: 'grey' }} />}
          >
            <div
              style={{
                width: '70%',
                display: 'inline-block',
                textAlign: 'center',
                border: '2px solid rgb(99 146 183 / 36%)',
                borderRadius: 15,
              }}
            >
              <span>
                <a className={styles.link}>{item.course_name}</a>
              </span>
              <div>
                <span style={{ marginRight: '10px' }}>
                  <Tooltip title={item.instructor}>
                    <UserOutlined />
                  </Tooltip>
                </span>
                {item.department}
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }
}
