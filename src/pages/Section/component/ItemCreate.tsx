import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TimeSelector from '@/components/TodoList/components/TimeSelector';

interface IProps {
  title: string;
  desLable: string;
  isCreate: boolean;
  handleOk: any;
  handeCancel: any;
}

const ItemCreate = (props: IProps) => {
  const [form] = Form.useForm();
  const [isCreate, setIsCreate] = useState(props.isCreate);
  useEffect(() => setIsCreate(props.isCreate), [props.isCreate]);
  useEffect(() => {
    form.setFieldsValue({
      description: undefined,
      expire_at: undefined,
    });
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((r) => {
        const wrappedVal = {
          ...r,
        };
        props.handleOk({ ...wrappedVal });
      })
      .catch((e) => console.error(e));
  };

  return (
    <Modal title={props.title} visible={isCreate} onOk={handleOk} onCancel={props.handeCancel}>
      <Form form={form}>
        <Form.Item label={props.desLable} name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'截止时间'} name={'expire_at'} rules={[{ required: true }]}>
          <TimeSelector format={'HH:mm:ss'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ItemCreate;
