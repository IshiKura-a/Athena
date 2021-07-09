import React, { useEffect, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import ListStyles from '../../HomeWork/style.less';
import type { SignIn } from '@/pages/Section/type';

interface PopConfirm {
  isSign: string | undefined;
  data: SignIn;
  handleOk: any;
  handleCancel: any;
}

const SignInConfirm = (props: PopConfirm) => {
  const [isSign, setIsSign] = useState(props.isSign);
  useEffect(() => {
    setIsSign(props.isSign);
  }, [props.isSign]);

  const handleConfirmSignVisible = (visible: boolean) => {
    console.log('handle visible change:', visible);
    if (visible && props.data.extra === 1) setIsSign(props.data.id);
    else setIsSign(undefined);
  };

  const handleOk = () => {
    props.handleOk(isSign);
    setIsSign(undefined);
  };

  return (
    <Popconfirm
      title="确认签到?"
      visible={isSign !== undefined && props.data.id === isSign}
      onVisibleChange={handleConfirmSignVisible}
      onConfirm={handleOk}
      onCancel={props.handleCancel}
      okText="确认"
      cancelText="取消"
      className={ListStyles.signStatusNot}
    >
      <Button type={'text'}>签到中</Button>
    </Popconfirm>
  );
};
export default SignInConfirm;
