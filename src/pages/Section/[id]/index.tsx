import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { history } from 'umi';
import { Card, Col, Divider, List, Modal, Row, Tabs } from 'antd';
import styles from '../style.less';
import { TabKey, TabName } from '@/pages/Section/type';
import type SectionStore from '@/pages/Section/model';
import { Link } from 'react-router-dom';
import SignInTab from '@/components/SignIn';
import HomeworkTab from '@/components/HomeWork';

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
                  <Card className={styles.tabPane}>//TODO</Card>
                </TabPane>

                <TabPane tab={TabName.Resource} key={TabKey.Resource}>
                  <Card className={styles.tabPane}>//TODO</Card>
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
                          <image
                            id="image0"
                            width="140"
                            height="76"
                            x="0"
                            y="0"
                            href="data:image/png;base64,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
AAAASUVORK5CYII="
                          />
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
