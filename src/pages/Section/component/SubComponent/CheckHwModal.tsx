import type { InstHW } from '@/pages/Section/[sectionID]/model';
import { useEffect, useState } from 'react';
import { Button, Card, Divider, Form, Input, List, Modal } from 'antd';
import styles from '../style.less';

import { FileOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

interface IProps {
  modalVisible: boolean;
  data: any;
  onSubmit: any;
  onOk: any;
}
const CheckModal = (props: IProps) => {
  const [checkId, setCheckId] = useState(0);
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const [dataToCheck, setDataToCheck] = useState(undefined as InstHW | undefined);
  useEffect(() => setModalVisible(props.modalVisible), [props.modalVisible]);
  useEffect(() => {
    // const data = props.data?.filter((item)=>item.id === checkId)[0];
    const data = props.data ? props.data[checkId] : undefined;
    if (data) setDataToCheck(data);
  }, [checkId, props.data]);

  const [form] = Form.useForm();

  const submitScore = () => {
    form.validateFields().then((r) => {
      const { score } = r;
      props.onSubmit({ score, stuId: dataToCheck?.id });
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

  return (
    <Modal
      visible={modalVisible}
      footer={[
        <Button key="ok" type="primary" onClick={props.onOk}>
          关闭
        </Button>,
      ]}
    >
      <Card>
        <div> {dataToCheck ? `学号:${dataToCheck?.id} 姓名:${dataToCheck?.name}` : '暂无提交'}</div>
        <div className={styles.hw_check_whole}>
          <div className={styles.hw_check_left}>
            <div>提交内容</div>
            <div>{dataToCheck?.record.content}</div>
            <div>
              <List
                className="hwCheckAppendix"
                dataSource={dataToCheck?.record.accessory}
                renderItem={(item: string) => (
                  <List.Item className="hwCheckAppendix">
                    <span>
                      <FileOutlined />
                      {item}
                    </span>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <Divider type={'vertical'} />
          <div className={styles.hw_check_right}>
            <Form form={form}>
              <Form.Item label={'评分:'} name={'score'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Form>
            <Button className={styles.hw_check_button} size={'small'} onClick={submitScore}>
              提交分数
            </Button>
            <div className={styles.hw_check_switch}>
              <Button
                shape={'circle'}
                icon={<LeftOutlined />}
                onClick={lastOne}
                disabled={disableLast()}
              />
              <Button
                shape={'circle'}
                icon={<RightOutlined />}
                onClick={nextOne}
                disabled={disableNext()}
              />
            </div>
          </div>
        </div>
        <Form></Form>
      </Card>
    </Modal>
  );
};

export default CheckModal;
