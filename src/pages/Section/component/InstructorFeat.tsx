import React, { Component } from 'react';
import { Card, Tabs, List, Button, Divider, message, Modal } from 'antd';
import { observer } from 'mobx-react';
import { InstuctorFeats } from '@/pages/Section/[sectionID]/type';
import styles from './style.less';
import type { HW, SignIn } from '@/pages/Section/[sectionID]/model';
import type SectionStore from '@/pages/Section/[sectionID]/model';
import moment from 'moment';
import { RoleType } from '@/pages/Login/model';
import SignInModal from '@/pages/Section/component/SubComponent/SignInModal';
import { cmpTime } from '@/pages/Home';
import SignInCreate from '@/pages/Section/component/SubComponent/SignInCreate';
import { FormOutlined } from '@ant-design/icons';

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
    const sectionID = this.props.sectionStore.currentLesson;
    this.props.sectionStore.listSign({ stuID: '0', role: RoleType.instructor, sectionID });
    this.props.sectionStore.listHw({ stuID: '0', role: RoleType.instructor, sectionID });
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  handleLook = (item: SignIn) => {
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

  handleCreate = () => {
    this.props.sectionStore.setSignInCreate(true);
  };

  handleCreateOk = (e: any) => {
    this.props.sectionStore.setSignInCreate(false);
  };

  handleCreateCancel = () => {
    this.props.sectionStore.setSignInCreate(false);
  };

  render() {
    const { lessonName, modalVisible, polling, dataToShow, signInList, signInCreate, hwList } =
      this.props.sectionStore;

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
                  onClick={this.handleCreate}
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
                      <span className={styles.signStatusYes}>签到人数</span>
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

              <SignInCreate
                isCreate={signInCreate}
                handleOk={this.handleCreateOk}
                handeCancel={this.handleCreateCancel}
              />
            </Card>
          </TabPane>
          <TabPane tab={'批改作业'} key={1}>
            <Card className={styles.tabPane}>
              <List
                dataSource={hwList}
                renderItem={(item: HW) => [
                  <List.Item>
                    <div>
                      <span>{item.description}</span>
                      <span>{item.expireAt}</span>
                      <span>{item.description}</span>
                      <span>{item.extra.status}</span>
                    </div>
                  </List.Item>,
                ]}
              ></List>
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
