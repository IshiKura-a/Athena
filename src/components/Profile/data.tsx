import { message } from 'antd';
import type ProfileStore from '@/pages/Profile/model';

export interface ProfileProps {
  profileStore: ProfileStore;
}

export function checkValidPhone(phoneInput: string) {
  console.log(phoneInput, /^[1][3,4,5,7,8][0-9]{9}$/.test('18502982125'));
  if (!phoneInput.match(/^[1][3,4,5,7,8][0-9]{9}$/)) {
    // 输入不正确
    return 0;
  }
  return 1;
}

export function checkValidEmail(emailInput: string) {
  if (!emailInput.match(/^\w+@\w+\.\w+$/i)) {
    // 输入不正确
    return 0;
  }
  return 1;
}

export function checkValidQQ(qqInput: string) {
  if (!qqInput.match(/^[1-9]\d{4,11}$/)) {
    // 输入不正确
    return 0;
  }
  return 1;
}

export function info(msg: string) {
  message.info(msg);
}

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
    title: '家乡',
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
