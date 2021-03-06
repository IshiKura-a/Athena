import { Button, Card, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from '@@/plugin-request/request';
import styles from '../style.less';
import { Meta } from 'antd/es/list/Item';
import type { SignIn } from '@/pages/Section/type';
import moment from 'moment';

interface ModalProps {
  modalVisible: boolean;
  polling: boolean;
  handleOk: any;
  handlePolling: any;
  sectionName: string | undefined;
  data: SignIn | undefined;
}

const SignInModal = (props: ModalProps) => {
  const [modalVisible, setVisible] = useState(props.modalVisible);
  const [signInData, setSignInData] = useState(props.data);
  const [isPolling, setIsPolling] = useState(false);
  const { run, cancel } = useRequest(props.handlePolling, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
    manual: true,
  });
  useEffect(() => setVisible(props.modalVisible), [props.modalVisible]);
  useEffect(() => {
    if (!isPolling && props.polling && props.modalVisible) {
      setIsPolling(true);
      run();
    } else if (isPolling && !props.polling) {
      setIsPolling(false);
      cancel();
    }
  }, [props.modalVisible, props.polling]);

  useEffect(() => setSignInData(props.data), [props.data]);

  const columns = [
    {
      title: '学号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Modal
      closable={false}
      visible={modalVisible}
      footer={[
        <Button key="ok" type="primary" onClick={props.handleOk}>
          关闭
        </Button>,
      ]}
      destroyOnClose={true}
    >
      <Card>
        <Meta
          title={props.sectionName ? `${props.sectionName}未签到名单` : 'error'}
          description={`${props.data?.description} 截止时间:${
            props.data ? `${moment(props.data.expire_at).format('YYYY-MM-DD HH:mm:ss')}` : ''
          }`}
        />
        <div className={styles.modal_table}>
          <Table columns={columns} dataSource={signInData?.extra.unsigned_students} size="small" />
        </div>
      </Card>
    </Modal>
  );
};

export default SignInModal;
