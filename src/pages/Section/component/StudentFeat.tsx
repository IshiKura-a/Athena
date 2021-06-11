import React, { Component } from 'react';
import { Button, Card, Divider, List, message, Modal, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { StudentFeats } from '@/pages/Section/[sectionID]/type';
import styles from '@/pages/Section/component/style.less';
import type SectionStore from '@/pages/Section/[sectionID]/model';
import type { SignIn } from '@/pages/Section/[sectionID]/model';
import { RoleType } from '../../Login/model';
import SignInConfirm from '@/pages/Section/component/SubComponent/SignInConfirm';
import { FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { HW } from '@/pages/Section/[sectionID]/model';

const { TabPane } = Tabs;

interface StudentProps {
  sectionStore: SectionStore;
}

const tabCallBack = (key: any) => {};

@observer
export default class StudentFeat extends Component<StudentProps, any> {
  componentDidMount() {
    const sectionID = this.props.sectionStore.currentLesson;
    this.props.sectionStore.listSign({ stuID: '0', role: RoleType.student, sectionID });
    this.props.sectionStore.listHw({ stuID: '0', role: RoleType.student, sectionID });
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

  render() {
    const { sectionStore } = this.props;
    const { lessonName, hwList } = this.props.sectionStore;
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
                <span className={styles.headStatus}>签到人数</span>
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
              <List
                dataSource={hwList}
                renderItem={(item: HW) => [
                  <List.Item>
                    <div>
                      <span>{item.description}</span>
                      <span>{item.expireAt}</span>
                      <span>{item.description}</span>
                      <span>{item.extra[0]?.status}</span>
                    </div>
                  </List.Item>,
                ]}
              ></List>
            </Card>
          </TabPane>
        </Tabs>
      </>
    );
  }
}
