import { Component, useEffect, useState } from 'react';
import { Card, List, message, Popconfirm, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { StudentFeats } from '@/pages/Section/[sectionID]/type';
import styles from '@/pages/Section/component/style.less';
import type SectionStore from '@/pages/Section/[sectionID]/model';
import type { SignIn } from '@/pages/Section/[sectionID]/model';
import moment from 'moment';
import { RoleType } from '@/pages/Login/model';

const { TabPane } = Tabs;

interface StudentProps {
  sectionStore: SectionStore;
}

interface PopConfirm {
  isSign: string;
  data: SignIn;
  handleOk: any;
  handleCancel: any;
}

const tabCallBack = (key: any) => {};

const CustomPopConfirm = (props: PopConfirm) => {
  const [isSign, setIsSign] = useState(props.isSign);
  useEffect(() => setIsSign(props.isSign), [props.isSign]);

  const handleConfirmSignVisible = (visible: boolean) => {
    if (visible && props.data.extra === 1) setIsSign(props.data.id);
    else setIsSign('');
  };

  const handleOk = () => {
    props.handleOk(props.data);
  };

  return (
    <Popconfirm
      title="确认签到?"
      visible={isSign === props.data.id}
      onVisibleChange={handleConfirmSignVisible}
      onConfirm={handleOk}
      onCancel={props.handleCancel}
      okText="确认"
      cancelText="取消"
      className={styles.signInItem}
    >
      <span className={props.data.extra === 2 ? styles.signMarkYes : styles.signMarkNot} />
      <span className={styles.signDes}>{props.data.description}</span>
      <span className={styles.signExpir}>
        {moment(props.data.expireAt).format('YYYY-MM-DD HH:mm:ss')}
      </span>
      {props.data.extra === 2 ? (
        <span className={styles.signStatusYes}>已签到</span>
      ) : (
        <span className={styles.signStatusNot}>未签到</span>
      )}
    </Popconfirm>
  );
};

@observer
export default class StudentFeat extends Component<StudentProps, any> {
  componentDidMount() {
    const sectionID = this.props.sectionStore.currentLesson;
    this.props.sectionStore.listSign({ stuID: '0', role: RoleType.student, sectionID });
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
    return (
      <>
        <Tabs defaultActiveKey={StudentFeats.SignIn} onChange={tabCallBack}>
          <TabPane tab={'签到'} key={0}>
            <Card className={styles.tabPane}>
              <List
                dataSource={sectionStore.signInList}
                renderItem={(item: SignIn) => (
                  <List.Item
                    className={styles.itemHeight}
                    onClick={this.handleSign.bind(this, item)}
                  >
                    <CustomPopConfirm
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
            <Card className={styles.tabPane}>student zuoye</Card>
          </TabPane>
        </Tabs>
      </>
    );
  }
}
