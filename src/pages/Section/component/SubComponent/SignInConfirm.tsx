import { useEffect, useState } from 'react';
import { Popconfirm } from 'antd';
import styles from '@/pages/Section/component/style.less';
import moment from 'moment';
import type { SignIn } from '@/pages/Section/[sectionID]/model';

interface PopConfirm {
  isSign: string;
  data: SignIn;
  handleOk: any;
  handleCancel: any;
}

const SignInConfirm = (props: PopConfirm) => {
  const [isSign, setIsSign] = useState(props.isSign);
  useEffect(() => setIsSign(props.isSign), [props.isSign]);

  const handleConfirmSignVisible = (visible: boolean) => {
    if (visible && props.data.extra === 1) setIsSign(props.data.id);
    else setIsSign('');
  };

  const handleOk = () => {
    props.handleOk(props.data);
  };

  return (
    <Popconfirm
      title="确认签到?"
      visible={isSign === props.data.id}
      onVisibleChange={handleConfirmSignVisible}
      onConfirm={handleOk}
      onCancel={props.handleCancel}
      okText="确认"
      cancelText="取消"
      className={styles.signInItem}
    >
      <span className={props.data.extra === 2 ? styles.signMarkYes : styles.signMarkNot} />
      <span className={styles.signDes}>{props.data.description}</span>
      <span className={styles.signExpir}>
        {moment(props.data.expireAt).format('YYYY-MM-DD HH:mm:ss')}
      </span>
      {props.data.extra === 2 ? (
        <span className={styles.signStatusYes}>已签到</span>
      ) : (
        <span className={styles.signStatusNot}>未签到</span>
      )}
    </Popconfirm>
  );
};
export default SignInConfirm;
