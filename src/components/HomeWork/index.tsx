import { Component } from 'react';
import { Button, Card, Divider, List, message, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import styles from './style.less';
import moment from 'moment';
import { FormOutlined } from '@ant-design/icons';
import type HomeworkStore from '@/components/HomeWork/model';
import ItemCreate from '@/components/SignIn/component/ItemCreate';
import CheckModal from '@/components/HomeWork/component/CheckHwModal';
import { RoleType } from '@/pages/Login/model';
import HandInModal from '@/components/HomeWork/component/HandInModal';

interface InstructorProps {
  hwStore: HomeworkStore;
  currentLessonName: string | undefined;
}

@inject('hwStore')
@observer
export default class HomeworkTab extends Component<InstructorProps, any> {
  async componentDidMount() {
    const { hwStore } = this.props;

    hwStore.setCheckModalVisible(false);
    hwStore.setHwCreate(false);
    hwStore.setIsCheck(undefined);
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  handleCheckHw = (id: string) => {
    const { hwStore } = this.props;

    hwStore.setIsCheck(id);
    hwStore.setCheckModalVisible(true);
  };

  handleCheckHwOk = (data: any) => {
    const { hwStore } = this.props;
    hwStore.checkHW(data);
  };

  handleCheckHwCancel = () => {
    const { hwStore } = this.props;

    hwStore.setCheckModalVisible(false);
    hwStore.setIsCheck(undefined);
  };

  handleCreateHw = () => {
    this.props.hwStore.setHwCreate(true);
  };

  handleCreateHwOk = (data: any) => {
    this.props.hwStore.createHW(data);
    this.props.hwStore.setHwCreate(false);
  };

  handleCreateHwCancel = () => {
    this.props.hwStore.setHwCreate(false);
  };

  handleHandIn = (item: any) => {
    if (item.is_expire) {
      message.error('已过期不能提交');
      return;
    }
    this.props.hwStore.setIsHandIn(item.id);
    this.props.hwStore.setHandInModalVisible(true);
  };

  handleHandInOk = (data: any) => {
    const { hwStore } = this.props;
    hwStore.setHandInModalVisible(false);
    if (hwStore.isHandIn) {
      hwStore.handInHw({ record: data });
    }
    this.props.hwStore.setIsHandIn(undefined);
  };

  handleHandInCancel = () => {
    this.props.hwStore.setHandInModalVisible(false);
    this.props.hwStore.setIsHandIn(undefined);
  };

  render() {
    const { hwStore, currentLessonName } = this.props;
    const {
      hwList,
      checkModalVisible,
      handInModalVisible,
      dataToCheck,
      recordsToShow,
      hwCreate,
      isLoading,
    } = hwStore;
    return (
      <>
        {hwStore.baseStore.type === RoleType.student ? (
          <Card className={styles.tabPane}>
            <Divider>
              <span>{`${currentLessonName}作业列表`}</span>
            </Divider>
            <span className={styles.list_head}>
              <div className={styles.head_des}>作业描述</div>
              <div className={styles.head_expir}>截止时间</div>
              <span className={styles.head_status}>提交状态</span>
            </span>
            <List
              loading={isLoading}
              dataSource={hwList}
              renderItem={(item) => [
                <List.Item
                  className={styles.item_height}
                  onClick={this.handleHandIn.bind(this, item.extra)}
                >
                  <span className={styles.list_item}>
                    <span className={styles.des_wrap}>
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
        ) : (
          <Card className={styles.tabPane}>
            <Divider>
              <span>{`${currentLessonName}作业列表`}</span>
              <Button
                icon={<FormOutlined />}
                className={styles.create_button}
                onClick={this.handleCreateHw}
              >
                发布作业
              </Button>
            </Divider>
            <span className={styles.list_head}>
              <div className={styles.head_des}>作业描述</div>
              <div className={styles.head_expir}>截止时间</div>
              <span className={styles.head_status}>提交人数</span>
            </span>
            <List
              loading={isLoading}
              dataSource={hwList}
              pagination={{
                hideOnSinglePage: true,
                pageSize: 15,
              }}
              renderItem={(item) => [
                <List.Item
                  className={styles.item_height}
                  onClick={this.handleCheckHw.bind(this, item.batch_id)}
                >
                  <span className={styles.list_item}>
                    <span className={styles.des_wrap}>
                      <span className={styles.signMarkYes} />
                      <span className={styles.des}>{item.description}</span>
                    </span>
                    <div className={styles.expire}>
                      {moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                    <div
                      className={styles.signStatusYes}
                    >{`${item.extra.hand_in_count}/${item.extra.homeworks?.length}`}</div>
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
        )}
      </>
    );
  }
}
