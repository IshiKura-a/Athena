import React, { Component } from 'react';
import { Card, Tabs, List, Button, Divider, message, Modal, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import type { SignIn } from '@/pages/Section/[sectionID]/type';
import { InstuctorFeats } from '@/pages/Section/[sectionID]/type';
import styles from '../style.less';
import moment from 'moment';
import SignInModal from '@/pages/Section/component/Instructor/SignInModal';
import { cmpTime } from '@/pages/Home';
import ItemCreate from '@/pages/Section/component/ItemCreate';
import { FormOutlined } from '@ant-design/icons';
import CheckModal from '@/pages/Section/component/Instructor/CheckHwModal';
import type { InstLesson } from '@/pages/Section/component/Instructor/model';
import type InstructorStore from '@/pages/Section/component/Instructor/model';

const { TabPane } = Tabs;

interface InstructorProps {
  instructorStore: InstructorStore;
  sectionID: string | undefined;
}

const tabCallBack = (key: any) => {};

@inject('instructorStore')
@observer
export default class InstructorFeat extends Component<InstructorProps, any> {
  async componentDidMount() {
    const { instructorStore, sectionID } = this.props;
    await instructorStore.fectchLessonList();
    instructorStore.handleRoute(sectionID);

    instructorStore.setPolling(false);
    instructorStore.setSignInModalVisible(false);
    instructorStore.setCheckModalVisible(false);
    instructorStore.setHwCreate(false);

    instructorStore.setSignInShow(undefined);
    instructorStore.setIsCheck(undefined);
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  handleLookSignIn = (item: any) => {
    if (item.extra.length === 0) {
      message.success('已全部签到');
      return;
    }

    this.props.instructorStore.setSignInShow(item.id);
    this.props.instructorStore.setSignInModalVisible(true);
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    if (cmpTime(now, item.expireAt, 'YYYY-MM-DD HH:mm:ss') < 0) {
      this.props.instructorStore.setPolling(true);
    }
  };

  handlePolling = () => {
    console.log('polling');
    return 'data';
  };

  handleLookSignInOk = () => {
    this.props.instructorStore.setSignInModalVisible(false);
    this.props.instructorStore.setPolling(false);
    this.props.instructorStore.setSignInShow(undefined);
  };

  handleCreateSignIn = () => {
    this.props.instructorStore.setSignInCreate(true);
  };

  handleCreateSignInOk = (data: any) => {
    this.props.instructorStore.setSignInCreate(false);
  };

  handleCreateSignInCancel = () => {
    this.props.instructorStore.setSignInCreate(false);
  };

  handleCheckHw = (id: string) => {
    this.props.instructorStore.setIsCheck(id);
    this.props.instructorStore.setCheckModalVisible(true);
  };

  handleCheckHwOk = (data: any) => {
    this.props.instructorStore.setCheckModalVisible(false);
    this.props.instructorStore.setIsCheck(undefined);
  };

  handleCheckHwCancel = () => {
    this.props.instructorStore.setCheckModalVisible(false);
    this.props.instructorStore.setIsCheck(undefined);
  };

  handleCreateHw = () => {
    this.props.instructorStore.setHwCreate(true);
  };

  handleCreateHwOk = (data: any) => {
    this.props.instructorStore.setHwCreate(false);
  };

  handleCreateHwCancel = () => {
    this.props.instructorStore.setHwCreate(false);
  };

  redirectToSection = (id: string) => {
    this.props.instructorStore.redirectRoute(id);
  };

  render() {
    const {
      signInModalVisible,
      lessonName,
      polling,
      dataToShow,
      signInList,
      signInCreate,
      hwList,
      checkModalVisible,
      dataToCheck,
      hwCreate,
    } = this.props.instructorStore;
    const { instructorStore } = this.props;
    return (
      <>
        <Row gutter={2}>
          <Col span={18}>
            <Card>
              <Tabs defaultActiveKey={InstuctorFeats.Named} onChange={tabCallBack}>
                <TabPane tab={'点名'} key={0}>
                  <Card className={styles.tabPane}>
                    <Divider>
                      <span>{`${lessonName}签到列表`}</span>
                      <Button
                        icon={<FormOutlined />}
                        className={styles.signButton}
                        onClick={this.handleCreateSignIn}
                      >
                        发布签到
                      </Button>
                    </Divider>
                    <span className={styles.signInHead}>
                      <div className={styles.headDes}>签到描述</div>
                      <div className={styles.headExpir}>截止时间</div>
                      <span className={styles.headStatus}>签到人数</span>
                    </span>
                    <List
                      dataSource={signInList}
                      renderItem={(item: SignIn) => (
                        <List.Item
                          className={styles.itemHeight}
                          onClick={this.handleLookSignIn.bind(this, item)}
                        >
                          <span className={styles.signInItem}>
                            <div className={styles.signMarkYes} />
                            <div className={styles.signDes}>{item.description}</div>
                            <div className={styles.signExpir}>
                              {moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                            <div className={styles.signStatusYes}>签到人数</div>
                          </span>
                        </List.Item>
                      )}
                    />

                    <SignInModal
                      modalVisible={signInModalVisible}
                      polling={polling}
                      data={dataToShow}
                      sectionName={lessonName}
                      handleOk={this.handleLookSignInOk}
                      handlePolling={this.handlePolling}
                    />

                    <ItemCreate
                      title={'创建签到'}
                      desLable={'签到描述'}
                      isCreate={signInCreate}
                      handleOk={this.handleCreateSignInOk}
                      handeCancel={this.handleCreateSignInCancel}
                    />
                  </Card>
                </TabPane>
                <TabPane tab={'批改作业'} key={1}>
                  <Card className={styles.tabPane}>
                    <Divider>
                      <span>{`${lessonName}作业列表`}</span>
                      <Button
                        icon={<FormOutlined />}
                        className={styles.signButton}
                        onClick={this.handleCreateHw}
                      >
                        发布作业
                      </Button>
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
                          onClick={this.handleCheckHw.bind(this, item.id)}
                        >
                          <span className={styles.signInItem}>
                            <div className={styles.signMarkYes} />
                            <div className={styles.signDes}>{item.description}</div>
                            <div className={styles.signExpir}>
                              {moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                            <div className={styles.signStatusYes}>提交人数</div>
                          </span>
                        </List.Item>,
                      ]}
                    />

                    <CheckModal
                      modalVisible={checkModalVisible}
                      data={dataToCheck}
                      onSubmit={this.handleCheckHwOk}
                      onOk={this.handleCheckHwCancel}
                    />

                    <ItemCreate
                      title={'创建作业'}
                      desLable={'作业描述'}
                      isCreate={hwCreate}
                      handleOk={this.handleCreateHwOk}
                      handeCancel={this.handleCreateHwCancel}
                    />
                  </Card>
                </TabPane>
                <TabPane tab={'讨论区'} key={2}>
                  <Card className={styles.tabPane}>//TODO</Card>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <List
                dataSource={instructorStore.lessonList}
                renderItem={(item: InstLesson) => (
                  <List.Item onClick={this.redirectToSection.bind(this, item.section_id)}>
                    <span>{item.course_id}</span>
                    <span>{item.course_name}</span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
