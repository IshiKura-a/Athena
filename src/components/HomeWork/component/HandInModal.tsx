import type { Record } from '@/pages/Section/type';
import React, { useEffect, useState } from 'react';
import { Button, Collapse, Divider, Form, Input, List, message, Modal, Upload } from 'antd';
import { DownOutlined, FileOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../style.less';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

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
      destroyOnClose={true}
      closable={false}
    >
      <Form form={form} preserve={false}>
        <Form.Item label={'备注'} name={'content'} rules={[{ required: true }, { max: 20 }]}>
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
        <Collapse>
          {props.records?.map((item, index) => {
            return (
              <CollapsePanel
                header={
                  <div>
                    <span>{<DownOutlined className={styles.icon_margin} />}</span>
                    {item.content}
                  </div>
                }
                key={index}
                showArrow={false}
              >
                <div className={styles.hw_hand_in_record}>
                  {item.accessory.length > 0 ? (
                    <List
                      style={{ display: 'inline-block' }}
                      dataSource={item.accessory}
                      renderItem={(appendix: string) => (
                        <div className={styles.hw_hand_in_appendix}>
                          <FileOutlined className={styles.icon_margin} />
                          {appendix}
                        </div>
                      )}
                    />
                  ) : (
                    '无附件'
                  )}
                </div>
              </CollapsePanel>
            );
          })}
        </Collapse>
      </div>
    </Modal>
  );
};

export default HandInModal;
