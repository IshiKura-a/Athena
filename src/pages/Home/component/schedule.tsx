import { Component } from 'react';
import type { Lesson } from '@/pages/Home/type';
import moment from 'moment';
import styles from './style.less';
import { observer } from 'mobx-react';
import { timeFormat } from '@/pages/Home/type';
import { Link } from 'react-router-dom';
import List from 'antd/es/list';
import SmileSvg from '@/pages/Home/smile_svg';

interface ScheduleProps {
  lessonInfo: Lesson[];
  day: number;
}

@observer
export default class Schedule extends Component<ScheduleProps, any> {
  render() {
    const { lessonInfo } = this.props;
    return (
      <>
        {lessonInfo.length === 0 ? (
          <div className="ant-empty ant-empty-normal">
            <div className="class= ant-empty ant-empty-normal">
              <svg
                className="ant-empty-img-simple"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                transform="scale(1.0)"
                p-id="1188"
                width="150"
                height="150"
              >
                <SmileSvg />
              </svg>
              <div className="ant-empty-description">今日无课</div>
            </div>
          </div>
        ) : (
          <List
            dataSource={lessonInfo}
            renderItem={(item: Lesson) => (
              <div className={styles.blockMargin}>
                <div className={styles.block__bar__info}>
                  <div className={styles.block__bar} />
                  <div>
                    <div>
                      <Link
                        to={`/section/${item.section_id}`}
                        className={styles.block__info__title}
                      >
                        {item.course_name}
                      </Link>
                      <span className={styles.block__click}>
                        <Link to={`/section/${item.section_id}`}>课程详情</Link>
                      </span>
                    </div>
                    <div className={styles.block__info__detail}>
                      <div>{`${moment(item.start_time, timeFormat).format('HH:mm')}~${moment(
                        item.end_time,
                        timeFormat,
                      ).format('HH:mm')}`}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </>
    );
  }
}
