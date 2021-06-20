import { useEffect, useState } from 'react';
import { Popconfirm } from 'antd';
import styles from '@/pages/Section/component/style.less';
import moment from 'moment';
import type { SignIn } from '@/pages/Section/component/Student/model';

interface PopConfirm {
  isSign: string | undefined;
  data: SignIn;
  handleOk: any;
  handleCancel: any;
}

const SignInConfirm = (props: PopConfirm) => {
  const [isSign, setIsSign] = useState(props.isSign);
  useEffect(() => setIsSign(props.isSign), [props.isSign]);

  const handleConfirmSignVisible = (visible: boolean) => {
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
      visible={isSign === props.data.id}
      onVisibleChange={handleConfirmSignVisible}
      onConfirm={handleOk}
      onCancel={props.handleCancel}
      okText="确认"
      cancelText="取消"
      className={styles.signInItem}
    >
      <span className={styles.desWrap}>
        <span className={props.data.extra === 0 ? styles.signMarkYes : styles.signMarkNot} />
        <span className={styles.des}>{props.data.description}</span>
      </span>

      <span className={styles.expire}>
        {moment(props.data.expire_at).format('YYYY-MM-DD HH:mm:ss')}
      </span>
      {props.data.extra === 0 ? (
        <span className={styles.signStatusYes}>已签到</span>
      ) : (
        <span className={styles.signStatusNot}>未签到</span>
      )}
    </Popconfirm>
  );
};
export default SignInConfirm;
