import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { history } from 'umi';
import { Card, Col, Divider, List, Row, Tabs, Modal } from 'antd';
import styles from '../style.less';
import { TabKey, TabName } from '@/pages/Section/type';
import type SectionStore from '@/pages/Section/model';
import { Link } from 'react-router-dom';
import Discussion from '@/components/Discussion';
import Resource from '@/components/Resource';
import SignInTab from '@/components/SignIn';
import HomeworkTab from '@/components/HomeWork';
import SectionSvg from '@/pages/Section/section_svg';

const { TabPane } = Tabs;

interface IProps {
  sectionStore: SectionStore;
}

@inject('sectionStore')
@observer
export default class Section extends Component<IProps, any> {
  section_reg = /\/section\//;

  async componentDidMount() {
    await this.props.sectionStore.fectchLessonList();
    const id = history.location.pathname;
    const section_id = id.replace(this.section_reg, '');
    this.props.sectionStore.handleRoute(section_id);
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  tabCallBack = (key: any) => {};

  redirectToSection = (sectionID: any) => {
    this.props.sectionStore.redirectRoute(sectionID);
  };

  render() {
    const { sectionStore } = this.props;
    const { lessonList, lessonName } = sectionStore;

    return (
      <>
        <Row gutter={2}>
          <Col span={16}>
            <Card>
              <Tabs onChange={this.tabCallBack}>
                <TabPane tab={TabName.SignIn} key={TabKey.SignIn}>
                  <SignInTab currentLessonName={lessonName} />
                </TabPane>
                <TabPane tab={TabName.Hw} key={TabKey.Hw}>
                  <HomeworkTab currentLessonName={lessonName} />
                </TabPane>
                <TabPane tab={TabName.Discuss} key={TabKey.Discuss}>
                  <Card className={styles.tabPane}>
                    <Discussion currentLessonName={lessonName} />
                  </Card>
                </TabPane>
                <TabPane tab={TabName.Resource} key={TabKey.Resource}>
                  <Card className={styles.tabPane}>
                    <Resource currentLessonName={lessonName} />
                  </Card>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Divider>课程列表</Divider>
              <List
                dataSource={lessonList}
                renderItem={(item) => (
                  <span onClick={this.redirectToSection.bind(this, item.section_id)}>
                    <div className={styles.section_item}>
                      <div className={styles.section_img}>
                        <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="140px"
                          height="76px"
                          viewBox="0 0 140 76"
                          enable-background="new 0 0 140 76"
                        >
                          <SectionSvg />
                        </svg>
                      </div>
                      <div className={styles.section_text}>
                        <Link
                          to={`/section/${item.section_id}`}
                          className={styles.section_course_name}
                        >
                          {item.course_name}
                        </Link>
                        <div className={styles.section_location}>{item.location}</div>
                      </div>
                    </div>
                  </span>
                )}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
