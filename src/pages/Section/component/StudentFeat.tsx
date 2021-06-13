import React, { Component } from 'react';
import { Card, Divider, List, message, Modal, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { StudentFeats } from '@/pages/Section/[sectionID]/type';
import styles from '@/pages/Section/component/style.less';
import type SectionStore from '@/pages/Section/[sectionID]/model';
import type { SignIn } from '@/pages/Section/[sectionID]/model';
import { RoleType } from '../../Login/model';
import SignInConfirm from '@/pages/Section/component/SubComponent/SignInConfirm';
import moment from 'moment';
import HandInModal from '@/pages/Section/component/SubComponent/HandInModal';

const { TabPane } = Tabs;

interface StudentProps {
  sectionStore: SectionStore;
}

const tabCallBack = (key: any) => {};

@observer
export default class StudentFeat extends Component<StudentProps, any> {
  componentDidMount() {
    const tmp = this.props.sectionStore.currentLesson;
    this.props.sectionStore.listSign({ stuID: '0', role: RoleType.student, sectionID: tmp || '0' });
    this.props.sectionStore.listHw({ stuID: '0', role: RoleType.student, sectionID: tmp || '0' });
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  handleSign = (item: SignIn) => {
    if (item.extra === 2) message.success('已签到');
    else if (item.extra === 0) message.error('已过期');
    else if (item.extra === 1) this.props.sectionStore.setIsSign(item.id);
  };

  handleOk = async (item: SignIn) => {
    await this.props.sectionStore.updateSign(item.id);
    this.props.sectionStore.setIsSign('');
  };

  handleCancel = () => {
    this.props.sectionStore.setIsSign('');
  };

  handleHandIn = (id: string, item: any) => {
    if (item.isExpire) {
      message.error('已过期不能提交');
      return;
    }

    this.props.sectionStore.setIsHandIn(id);
    this.props.sectionStore.setHandInModalVisible(true);
  };

  handleHandInOk = (data: any) => {
    this.props.sectionStore.setHandInModalVisible(false);
    this.props.sectionStore.setIsHandIn(undefined);
    console.log('handin:', data);
  };

  handleHandInCancel = () => {
    this.props.sectionStore.setHandInModalVisible(false);
    this.props.sectionStore.setIsHandIn(undefined);
  };

  render() {
    const { sectionStore } = this.props;
    const { lessonName, hwList, handInModalVisible, recordsToShow } = this.props.sectionStore;
    return (
      <>
        <Tabs defaultActiveKey={StudentFeats.SignIn} onChange={tabCallBack}>
          <TabPane tab={'签到'} key={0}>
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
                dataSource={sectionStore.signInList}
                renderItem={(item: SignIn) => (
                  <List.Item
                    className={styles.itemHeight}
                    onClick={this.handleSign.bind(this, item)}
                  >
                    <SignInConfirm
                      isSign={sectionStore.isSign}
                      data={item}
                      handleCancel={this.handleCancel}
                      handleOk={this.handleOk}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
          <TabPane tab={'作业'} key={1}>
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
                renderItem={(item: any) => [
                  <List.Item
                    className={styles.itemHeight}
                    onClick={this.handleHandIn.bind(this, item.id, item.extra)}
                  >
                    <span className={styles.signInItem}>
                      <div
                        className={
                          item.extra?.status === 2 ? styles.signMarkNot : styles.signMarkYes
                        }
                      />
                      <div className={styles.signDes}>{item.description}</div>
                      <div className={styles.signExpir}>
                        {moment(item.expireAt).format('YYYY-MM-DD HH:mm:ss')}
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
      </>
    );
  }
}
