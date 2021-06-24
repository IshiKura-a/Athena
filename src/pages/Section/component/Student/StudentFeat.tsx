import React, { Component } from 'react';
import { Card, Col, Divider, List, message, Modal, Row, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { StudentFeats } from '@/pages/Section/[sectionID]/type';
import type { SignIn } from '@/pages/Section/[sectionID]/type';
import styles from '@/pages/Section/component/style.less';
import SignInConfirm from '@/pages/Section/component/Student/SignInConfirm';
import HandInModal from '@/pages/Section/component/Student/HandInModal';
import type StudentStore from '@/pages/Section/component/Student/model';
import type { InstLesson } from '@/pages/Section/component/Instructor/model';
import type { Record } from '@/pages/Section/[sectionID]/type';

const { TabPane } = Tabs;

interface StudentProps {
  studentStore: StudentStore;
  sectionID: string | undefined;
}

const tabCallBack = (key: any) => {};

@inject('studentStore')
@observer
export default class StudentFeat extends Component<StudentProps, any> {
  async componentDidMount() {
    const { studentStore, sectionID } = this.props;
    await studentStore.fectchLessonList();
    studentStore.handleRoute(sectionID);

    studentStore.setIsSign(undefined);
    studentStore.setIsHandIn(undefined);
    studentStore.setHandInModalVisible(false);
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  handleSign = (item: SignIn) => {
    if (item.extra === 2) message.error('已过期');
    else if (item.extra === 0) message.success('已签到');
    else if (item.extra === 1) {
      this.props.studentStore.setIsSign(item.id);
    }
  };

  handleSignInOk = async (id: string) => {
    this.props.studentStore.setIsSign(undefined);
    await this.props.studentStore.updateSign(id);
  };

  handleSignInCancel = () => {
    this.props.studentStore.setIsSign(undefined);
  };

  handleHandIn = (item: any) => {
    if (item.is_expire) {
      message.error('已过期不能提交');
      return;
    }
    this.props.studentStore.setIsHandIn(item.id);
    this.props.studentStore.setHandInModalVisible(true);
  };

  handleHandInOk = (data: Record) => {
    const { studentStore } = this.props;
    studentStore.setHandInModalVisible(false);
    if (studentStore.isHandIn) {
      studentStore.handInHw({ record: data });
    }
    this.props.studentStore.setIsHandIn(undefined);
  };

  handleHandInCancel = () => {
    this.props.studentStore.setHandInModalVisible(false);
    this.props.studentStore.setIsHandIn(undefined);
  };

  redirectToSection = (id: string) => {
    this.props.studentStore.redirectRoute(id);
  };

  render() {
    const { studentStore } = this.props;
    const { lessonName, isSign, hwList, handInModalVisible, recordsToShow } =
      this.props.studentStore;
    return (
      <>
        <Row gutter={2}>
          <Col span={17}>
            <Card>
              <Tabs defaultActiveKey={StudentFeats.SignIn} onChange={tabCallBack}>
                <TabPane tab={'签到'} key={StudentFeats.SignIn}>
                  <Card className={styles.tabPane}>
                    <Divider>
                      <span>{`${lessonName}签到列表`}</span>
                    </Divider>

                    <span className={styles.signInHead}>
                      <div className={styles.headDes}>签到描述</div>
                      <div className={styles.headExpir}>截止时间</div>
                      <span className={styles.headStatus}>签到状态</span>
                    </span>
                    <List
                      dataSource={studentStore.signInList}
                      renderItem={(item: SignIn) => (
                        <List.Item
                          className={styles.itemHeight}
                          onClick={this.handleSign.bind(this, item)}
                        >
                          <SignInConfirm
                            isSign={isSign}
                            data={item}
                            handleCancel={this.handleSignInCancel}
                            handleOk={this.handleSignInOk}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </TabPane>
                <TabPane tab={'作业'} key={StudentFeats.SubmitHW}>
                  <Card className={styles.tabPane}>
                    <Divider>
                      <span>{`${lessonName}作业列表`}</span>
                    </Divider>
                    <span className={styles.signInHead}>
                      <div className={styles.headDes}>作业描述</div>
                      <div className={styles.headExpir}>截止时间</div>
                      <span className={styles.headStatus}>提交状态</span>
                    </span>
                    <List
                      dataSource={hwList}
                      renderItem={(item) => [
                        <List.Item
                          className={styles.itemHeight}
                          onClick={this.handleHandIn.bind(this, item.extra)}
                        >
                          <span className={styles.signInItem}>
                            <span className={styles.desWrap}>
                              <span
                                className={
                                  item.extra?.status === 2 ? styles.signMarkNot : styles.signMarkYes
                                }
                              />
                              <span className={styles.des}>{item.description}</span>
                            </span>
                            <div className={styles.expire}>
                              {moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                            {item.extra?.status === 2 ? (
                              <div className={styles.signStatusNot}>未提交</div>
                            ) : (
                              <div className={styles.signStatusYes}>
                                {item.extra?.status === 1 ? item.extra.score : '已提交'}
                              </div>
                            )}
                          </span>
                        </List.Item>,
                      ]}
                    />

                    <HandInModal
                      modalVisible={handInModalVisible}
                      records={recordsToShow}
                      handInOk={this.handleHandInOk}
                      handInCancel={this.handleHandInCancel}
                    />
                  </Card>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={7}>
            <Card>
              <Divider>课程列表</Divider>
              <List
                dataSource={studentStore.lessonList}
                renderItem={(item: InstLesson) => (
                  <div
                    className={styles.section_item}
                    onClick={this.redirectToSection.bind(this, item.section_id)}
                  >
                    <span>{item.course_id}</span>
                    <span>{item.course_name}</span>
                  </div>
                )}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
