import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputNumber, List, Modal, Tooltip } from 'antd';
import { saveAs } from 'file-saver';
import styles from '../style.less';

import {
  CheckOutlined,
  DownloadOutlined,
  FileOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

interface IProps {
  modalVisible: boolean;
  data: any;
  onSubmit: any;
  onOk: any;
}
const CheckModal = (props: IProps) => {
  const [checkId, setCheckId] = useState(0);
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const [dataToCheck, setDataToCheck] = useState(undefined as any | undefined);
  useEffect(() => setModalVisible(props.modalVisible), [props.modalVisible]);
  useEffect(() => {
    const data = props.data ? props.data?.homeworks[checkId] : undefined;
    if (data) setDataToCheck(data);
  }, [checkId, props.data]);

  const [form] = Form.useForm();

  const submitScore = () => {
    form.validateFields().then((r) => {
      const { score } = r;
      props.onSubmit({ score, id: dataToCheck?.id });
    });
  };

  const disableNext = () => {
    if (props.data) {
      return checkId >= props.data.length - 1;
    }
    return false;
  };

  const disableLast = () => {
    return checkId <= 0;
  };

  const lastOne = () => {
    const tmp = checkId > 0 ? checkId - 1 : 0;
    setCheckId(tmp);
  };

  const nextOne = () => {
    if (props.data) {
      const tmp = checkId >= props.data.length ? checkId : checkId + 1;
      setCheckId(tmp);
    }
  };

  const dataURItoBlob = (dataURI) => {
    if (dataURI === '') {
      return new Blob();
    }
    const byteString = atob(dataURI.split(',')[1]);

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);

    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const downLoad = (fileName, fileStr) => {
    return (e: any) => {
      // console.log(fileStr);
      const blob = dataURItoBlob(fileStr);
      saveAs(blob, fileName);
    };
  };

  return (
    <Modal
      visible={modalVisible}
      footer={[
        <Button key="ok" type="primary" onClick={props.onOk}>
          关闭
        </Button>,
      ]}
      closable={false}
      destroyOnClose={true}
    >
      <Card>
        <div className={styles.hw_check_head}>
          <div className={styles.hw_check_inline}>
            <span className={styles.hw_id}>{`学号:${dataToCheck?.student_id}`}</span>
            <span>{`姓名:${dataToCheck?.name}`}</span>
          </div>
          <div className={styles.hw_check_form_inline}>
            <Form form={form} preserve={false}>
              <Form.Item label={'评分:'} name={'score'} rules={[{ required: true }]}>
                <InputNumber
                  defaultValue={dataToCheck?.score}
                  disabled={dataToCheck?.record?.content === undefined}
                />
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className={styles.hw_check_whole}>
          <div className={styles.hw_check_content}>{`备注：${
            dataToCheck?.record?.content === undefined ? `暂未提交` : dataToCheck?.record?.content
          }`}</div>
          <List
            className={styles.hw_check_appendix_list}
            dataSource={dataToCheck?.record?.accessory}
            renderItem={(item: string) => (
              <div className={styles.hw_check_appendix}>
                <span className={styles.hw_check_text_overflow}>
                  <DownloadOutlined
                    className={styles.icon_margin}
                    onClick={downLoad(item.split('\n')[0], item.split('\n')[1] || '')}
                  />
                  {item.split('\n')[0]}
                </span>
              </div>
            )}
          />
        </div>

        <div className={styles.hw_check_footer}>
          <div className={styles.hw_check_switch}>
            <Button
              type={'text'}
              icon={<LeftOutlined />}
              onClick={lastOne}
              disabled={disableLast()}
            />
            <Button
              type={'text'}
              icon={<RightOutlined />}
              onClick={nextOne}
              disabled={disableNext()}
            />
          </div>
          <div className={styles.hw_check_button}>
            <Button
              onClick={submitScore}
              icon={<CheckOutlined />}
              disabled={dataToCheck?.record?.content === undefined}
            >
              确认
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default CheckModal;
