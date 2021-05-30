import { message } from 'antd';
import type ProfileStore from '@/pages/Profile/model';

export interface ProfileProps {
  profileStore: ProfileStore;
}

export function checkValidPhone(phoneInput: string) {
  if (Number.isNaN(phoneInput)) {
    // 输入的不是数字
    return 0;
  }
  if (phoneInput.length !== 11) {
    // 输入的位数不对
    return -1;
  }
  return 1;
}

export function checkValidEmail(emailInput: string) {
  if (emailInput.indexOf('@') === -1) {
    // 没有输入@
    return 0;
  }
  return 1;
}

export function checkValidQQ(qqInput: string) {
  if (Number.isNaN(qqInput)) {
    return 0;
  }
  if (qqInput.length < 5 || qqInput.length > 11) {
    return -1;
  }
  return 1;
}

export function info(msg: string) {
  message.info(msg);
}

// 两个参数：当前状态，状态更新函数
// const {
//   name,
//   id,
//   major,
//   phone,
//   email,
//   wechat,
//   qq,
//   gender,
//   campus,
//   birthday,
//   blood_type,
//   status,
//   politics,
//   hometown,
//   nation,
//   dormitory,
// } = profilestore.profileInfo.basic_person;

// let emailVisible = email;
// let telephoneVisible = phone;
// let wechatVisible = wechat;
// let qqVisible = qq;

export const dataTitle = [
  {
    title: '姓 名',
    copyable: true,
    // editable: false,
  },
  {
    title: '学 号',
    copyable: true,
    // editable: false,
  },
  {
    title: '手 机',
    copyable: false,
    // editable: {
    //   onChange: (telephoneInput: string) => {
    //     const checkTelephone = checkValidPhone(telephoneInput);
    //     if (checkTelephone === 1) {
    //       telephoneVisible = telephoneInput;
    //       profileStore.editTelephone(telephoneInput);
    //       forceUpdate();
    //     } else if (checkTelephone === 0) {
    //       info('Input should be number.');
    //     } else if (checkTelephone === -1) {
    //       info('Input length is not valid.');
    //     }
    //   },
    // },
  },
  {
    title: '邮 箱',
    copyable: false,
    // editable: false,
  },
  {
    title: '民 族',
    copyable: true,
    // editable: false,
  },
  {
    title: '政治面貌',
    copyable: true,
    // editable: false,
  },
  {
    title: '生源地',
    copyable: true,
    // editable: false,
  },
  {
    title: '寝室号',
    copyable: true,
    // editable: false,
  },
  {
    title: '微信号码',
    copyable: false,
    // editable: false,
  },
  {
    title: 'QQ号码',
    copyable: false,
    // editable: false,
  },
];
