import React, { Component } from 'react';
import { Card, Tabs, List, Button, Divider, message, Modal } from 'antd';
import { observer } from 'mobx-react';
import { InstuctorFeats } from '@/pages/Section/[sectionID]/type';
import styles from './style.less';
import type { SignIn } from '@/pages/Section/[sectionID]/model';
import type SectionStore from '@/pages/Section/[sectionID]/model';
import moment from 'moment';
import { RoleType } from '@/pages/Login/model';
import SignInModal from '@/pages/Section/component/SubComponent/SignInModal';
import { cmpTime } from '@/pages/Home';
import ItemCreate from '@/pages/Section/component/SubComponent/ItemCreate';
import { FormOutlined } from '@ant-design/icons';
import CheckModal from '@/pages/Section/component/SubComponent/CheckHwModal';

const { TabPane } = Tabs;

interface InstructorProps {
  sectionStore: SectionStore;
}

const tabCallBack = (key: any) => {
  console.log(key);
};

@observer
export default class InstructorFeat extends Component<InstructorProps, any> {
  componentDidMount() {
    const tmp = this.props.sectionStore.currentLesson;
    this.props.sectionStore.listSign({
      stuID: '0',
      role: RoleType.instructor,
      sectionID: tmp || '0',
    });
    this.props.sectionStore.listHw({
      stuID: '0',
      role: RoleType.instructor,
      sectionID: tmp || '0',
    });
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  handleLook = (item: any) => {
    if (item.extra.length === 0) {
      message.success('已全部签到');
      return;
    }

    this.props.sectionStore.setSignInShow(item.id);
    this.props.sectionStore.setModalVisible(true);
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    if (cmpTime(now, item.expireAt, 'YYYY-MM-DD HH:mm:ss') < 0) {
      this.props.sectionStore.setPolling(true);
    }
  };

  handlePolling = () => {
    console.log('polling');
    return 'data';
  };

  handleOk = () => {
    this.props.sectionStore.setModalVisible(false);
    this.props.sectionStore.setPolling(false);
    this.props.sectionStore.setSignInShow(undefined);
  };

  handleCreateSignIn = () => {
    this.props.sectionStore.setSignInCreate(true);
  };

  handleCreateSignInOk = (data: any) => {
    this.props.sectionStore.setSignInCreate(false);
  };

  handleCreateSignInCancel = () => {
    this.props.sectionStore.setSignInCreate(false);
  };

  handleCheckHw = (id: string) => {
    this.props.sectionStore.setIsCheck(id);
    this.props.sectionStore.setCheckModalVisible(true);
  };

  handleCheckHwOk = (data: any) => {
    console.log(data);
    this.props.sectionStore.setCheckModalVisible(false);
    this.props.sectionStore.setIsCheck(undefined);
  };

  handleCheckHwCancel = () => {
    this.props.sectionStore.setCheckModalVisible(false);
    this.props.sectionStore.setIsCheck(undefined);
  };

  handleCreateHw = () => {
    this.props.sectionStore.setHwCreate(true);
  };

  handleCreateHwOk = (data: any) => {
    this.props.sectionStore.setHwCreate(false);
  };

  handleCreateHwCancel = () => {
    this.props.sectionStore.setHwCreate(false);
  };

  render() {
    const {
      lessonName,
      modalVisible,
      polling,
      dataToShow,
      signInList,
      signInCreate,
      hwList,
      checkModalVisible,
      dataToCheck,
      hwCreate,
    } = this.props.sectionStore;

    return (
      <>
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
                    onClick={this.handleLook.bind(this, item)}
                  >
                    <span className={styles.signInItem}>
                      <div className={styles.signMarkYes} />
                      <div className={styles.signDes}>{item.description}</div>
                      <div className={styles.signExpir}>
                        {moment(item.expireAt).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                      <div className={styles.signStatusYes}>签到人数</div>
                    </span>
                  </List.Item>
                )}
              />

              <SignInModal
                modalVisible={modalVisible}
                polling={polling}
                data={dataToShow}
                sectionName={lessonName}
                handleOk={this.handleOk}
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
                        {moment(item.expireAt).format('YYYY-MM-DD HH:mm:ss')}
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
      </>
    );
  }
}
