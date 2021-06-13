import type { Record } from '@/pages/Section/[sectionID]/model';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {
  modalVisible: boolean;
  records: Record[];
  handInOk: any;
  handInCancel: any;
}

const HandInModal = (props: IProps) => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const [accessory, setAccessory] = useState([]);
  const [uploadList, setUploadList] = useState(undefined);
  useEffect(() => {
    setModalVisible(props.modalVisible);
  }, [props.modalVisible]);
  useEffect(() => {
    const tmp: any = [];
    accessory.forEach((item) => [tmp.push({ name: item, status: 'done' })]);
    setUploadList(tmp);
  }, [accessory]);

  const [form] = Form.useForm();

  const handleHandIn = () => {
    form
      .validateFields()
      .then((r) => {
        const { content } = r;
        props.handInOk({ content, accessory });
      })
      .catch((e) => console.error(e));
  };

  const onUploadChange = ({ file }) => {
    if (file.status === 'done' || file.status === 'error') {
      message.success(`${file} uploaded successfully`);
      console.log(file.name);
      const tmp = accessory;
      tmp.push(file.name);
      setAccessory(tmp);
    }
  };

  return (
    <Modal
      title={'提交作业'}
      visible={modalVisible}
      onOk={handleHandIn}
      onCancel={props.handInCancel}
    >
      <Form form={form}>
        <Form.Item label={'提交内容'} name={'content'} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'添加附件'} name={'accessory'}>
          <Upload onChange={onUploadChange}>
            <Button icon={<UploadOutlined />}>添加附件</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HandInModal;
