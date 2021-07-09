import React, { Component } from 'react';
import { Button, Card, Divider, List, message, Modal, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react';
import ListStyles from '../HomeWork/style.less';
import SignInConfirm from '@/components/SignIn/component/SignInConfirm';
import type SignInStore from '@/components/SignIn/model';
import type { SignIn } from '@/pages/Section/type';
import { RoleType } from '@/pages/Login/model';
import { FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { cmpTime } from '@/pages/Home';
import SignInModal from '@/components/SignIn/component/SignInModal';
import ItemCreate from '@/components/SignIn/component/ItemCreate';
import { SignInStatus } from '@/pages/Section/type';

interface IProps {
  signInStore: SignInStore;
  currentLessonName: string | undefined;
}

@inject('signInStore')
@observer
export default class SignInTab extends Component<IProps, any> {
  async componentDidMount() {
    const { signInStore } = this.props;

    signInStore.setIsSign(undefined);
    signInStore.setSignInShow(undefined);
    signInStore.setSignInModalVisible(false);
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  // student

  handleSign = (status: any, id: string) => {
    if (status === 2) message.error('已过期');
    else if (status === 0) message.success('已签到');
    else if (status === 1) {
      this.props.signInStore.setIsSign(undefined);
    }
  };

  handleSignInOk = async (id: any) => {
    this.props.signInStore.setIsSign(undefined);
    await this.props.signInStore.updateSign(id);
  };

  handleSignInCancel = () => {
    this.props.signInStore.setIsSign(undefined);
  };

  // instructor
  handleLookSignIn = (item: SignIn) => {
    if (item.extra.unsigned_students?.length === 0) {
      message.success('已全部签到');
      return;
    }
    const { signInStore } = this.props;

    signInStore.setSignInShow(item.id);
    signInStore.setSignInModalVisible(true);
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    if (cmpTime(now, item.expire_at, 'YYYY-MM-DD HH:mm:ss') > 0) {
      signInStore.setPolling(true);
    }
  };

  handlePolling = async () => {
    await this.props.signInStore.listSign();
    return undefined;
  };

  handleLookSignInOk = () => {
    const { signInStore } = this.props;
    signInStore.setSignInModalVisible(false);
    signInStore.setPolling(false);
    signInStore.setSignInShow(undefined);
  };

  handleCreateSignIn = () => {
    this.props.signInStore.setSignInCreate(true);
  };

  handleCreateSignInOk = (data: any) => {
    const { signInStore } = this.props;
    signInStore.createSign(data);
    signInStore.setSignInCreate(false);
  };

  handleCreateSignInCancel = () => {
    this.props.signInStore.setSignInCreate(false);
  };

  handleStatus = (item: SignIn) => {
    if (item.extra === SignInStatus.Signed) {
      return <span className={ListStyles.signStatusYes}>已签到</span>;
    }

    if (item.extra === SignInStatus.Signing) {
      return (
        <SignInConfirm
          isSign={this.props.signInStore.isSign}
          data={item}
          handleOk={this.handleSignInOk}
          handleCancel={this.handleSignInCancel}
        />
      );
    }
    return <span className={ListStyles.signStatusNot}>未签到</span>;
  };

  render() {
    const { signInStore, currentLessonName } = this.props;
    const {
      isSign,
      signInList,
      signInModalVisible,
      polling,
      dataToShow,
      signInCreate,
    } = this.props.signInStore;
    return (
      <>
        {signInStore.baseStore.type === RoleType.student ? (
          <Card className={ListStyles.tabPane}>
            <Divider>
              <span>{`${currentLessonName}签到列表`}</span>
            </Divider>

            <span className={ListStyles.list_head}>
              <div className={ListStyles.head_des}>签到描述</div>
              <div className={ListStyles.head_expir}>截止时间</div>
              <span className={ListStyles.head_status}>签到状态</span>
            </span>
            <List
              dataSource={signInStore.signInList}
              pagination={{
                hideOnSinglePage: true,
                pageSize: 15,
              }}
              renderItem={(item: SignIn) => (
                <List.Item
                  className={ListStyles.item}
                  onClick={this.handleSign.bind(this, item.extra, item.id)}
                >
                  <div className={ListStyles.des_wrap}>
                    <span
                      className={item.extra === 0 ? ListStyles.signMarkYes : ListStyles.signMarkNot}
                    />
                    <span className={ListStyles.des}>{item.description}</span>
                  </div>

                  <span className={ListStyles.expire}>
                    {moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <>{this.handleStatus(item)}</>
                </List.Item>
              )}
            />
          </Card>
        ) : (
          <Card className={ListStyles.tabPane}>
            <Divider>
              <span>{`${currentLessonName}签到列表`}</span>
              <Button
                icon={<FormOutlined />}
                className={ListStyles.create_button}
                onClick={this.handleCreateSignIn}
              >
                发布签到
              </Button>
            </Divider>
            <span className={ListStyles.list_head}>
              <div className={ListStyles.head_des}>签到描述</div>
              <div className={ListStyles.head_expir}>截止时间</div>
              <span className={ListStyles.head_status}>签到人数</span>
            </span>
            <List
              dataSource={signInList}
              renderItem={(item: SignIn) => (
                <List.Item
                  className={ListStyles.item_height}
                  onClick={this.handleLookSignIn.bind(this, item)}
                >
                  <span className={ListStyles.list_item}>
                    <div className={ListStyles.des_wrap}>
                      <span className={ListStyles.signMarkYes} />
                      <span className={ListStyles.des}>{item.description}</span>
                    </div>

                    <div className={ListStyles.expire}>
                      {moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                    <div
                      className={ListStyles.signStatusYes}
                    >{`${item.extra.signed_students_count}/${item.extra.students_total}`}</div>
                  </span>
                </List.Item>
              )}
            />

            <SignInModal
              modalVisible={signInModalVisible}
              polling={polling}
              data={dataToShow}
              sectionName={currentLessonName}
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
        )}
      </>
    );
  }
}
