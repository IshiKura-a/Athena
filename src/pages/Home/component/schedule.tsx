import { Component } from 'react';
import type { Lesson } from '@/pages/Home/type';
import moment from 'moment';
import styles from './style.less';
import { observer } from 'mobx-react';
import { timeFormat } from '@/pages/Home/type';
import { Link } from 'react-router-dom';
import List from 'antd/es/list';

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
            <div className="class=" ant-empty ant-empty-normal>
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
                <defs>
                  <style type="text/css"></style>
                </defs>
                <path
                  d="M512 64C265.6 64 64 265.6 64 512s201.6 448 448 448 448-201.6 448-448S758.4 64 512 64zM512 896C300.8 896 128 723.2 128 512S300.8 128 512 128s384 172.8 384 384S723.2 896 512 896z"
                  p-id="1189"
                  fill="#e6e6e6"
                ></path>
                <path
                  d="M656 368m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
                  p-id="1190"
                  fill="#e6e6e6"
                ></path>
                <path
                  d="M368 368m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
                  p-id="1191"
                  fill="#e6e6e6"
                ></path>
                <path
                  d="M736 544c-16-6.4-35.2 3.2-38.4 22.4C672 646.4 595.2 704 512 704s-160-57.6-185.6-137.6C323.2 550.4 304 540.8 288 544c-16 6.4-25.6 22.4-22.4 38.4 32 108.8 134.4 182.4 246.4 182.4s214.4-73.6 246.4-182.4C761.6 569.6 752 550.4 736 544z"
                  p-id="1192"
                  fill="#e6e6e6"
                ></path>
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
