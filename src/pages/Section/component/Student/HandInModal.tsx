import type { Record } from '@/pages/Section/[sectionID]/type';
import { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, List, message, Modal, Upload } from 'antd';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../style.less';

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
      message.success(`${file.name} uploaded successfully`);
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
      <Divider orientation="left" plain>
        历史提交
      </Divider>
      <div>
        <List
          dataSource={props.records}
          renderItem={(item: Record, index) => (
            <div className={styles.hw_hand_in_record}>
              <span className={styles.hw_hand_in_content}>{item.content}</span>
              <List
                style={{ display: 'inline-block' }}
                dataSource={item.accessory}
                renderItem={(appendix: string) => (
                  <span className={styles.hw_hand_in_appendix}>
                    <FileOutlined />
                    {appendix}
                  </span>
                )}
              />
            </div>
          )}
        />
      </div>
    </Modal>
  );
};

export default HandInModal;
