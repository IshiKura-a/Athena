import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import TimeSelector from '@/components/TodoList/components/TimeSelector';
import type { Todo } from '@/components/TodoList/model';

interface IProps {
  _id?: string;
  modalVisible: boolean;
  confirmLoading: boolean;
  handleOk: any;
  handleCancel: any;
  dataToEdit: Todo;
}

const CustomModal = (props: IProps) => {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm();

  const [_id, setId] = useState(props._id);
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const [confirmLoading, setConfirmLoading] = useState(props.confirmLoading);
  const [dataToEdit, setDataToEdit] = useState(props.dataToEdit);
  useEffect(() => setModalVisible(props.modalVisible), [props.modalVisible]);
  useEffect(() => setConfirmLoading(props.confirmLoading), [props.confirmLoading]);
  useEffect(() => setId(props._id), [props._id]);
  useEffect(() => {
    setDataToEdit((_) => props.dataToEdit);
    form.setFieldsValue({
      title: undefined,
      description: undefined,
      end_time: undefined,
      ...props.dataToEdit,
    });
  }, [props.dataToEdit]);

  const handleOk = () => {
    form
      .validateFields()
      .then((r) => {
        props.handleOk({ _id, finished: false, ...r });
      })
      .catch((e) => console.error(e));
  };

  return (
    <Modal
      title={`${_id ? '编辑' : '创建'}Todo`}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={props.handleCancel}
    >
      <Form {...layout} form={form}>
        <Form.Item
          label={'标题'}
          required
          name={'title'}
          initialValue={dataToEdit?.title}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'描述'} name={'description'} initialValue={dataToEdit?.description}>
          <TextArea />
        </Form.Item>
        <Form.Item label={'DDL'} name={'end_time'} initialValue={dataToEdit?.end_time}>
          <TimeSelector />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomModal;
