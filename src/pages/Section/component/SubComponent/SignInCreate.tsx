import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import TimeSelector from '@/components/TodoList/components/TimeSelector';

interface IProps {
  isCreate: boolean;
  handleOk: any;
  handeCancel: any;
}

const SignInCreate = (props: IProps) => {
  const [form] = Form.useForm();
  const [isCreate, setIsCreate] = useState(props.isCreate);
  useEffect(() => setIsCreate(props.isCreate), [props.isCreate]);
  useEffect(() => {
    form.setFieldsValue({
      description: undefined,
      expireAt: undefined,
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
    <Modal title={'创建签到'} visible={isCreate} onOk={handleOk} onCancel={props.handeCancel}>
      <Form form={form}>
        <Form.Item label={'签到描述'} name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'过期时间'} name={'expireAt'} rules={[{ required: true }]}>
          <TimeSelector format={'HH:mm:ss'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignInCreate;
