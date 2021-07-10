export enum TabKey {
  SignIn = 1,
  Hw = 2,
  Resource = 3,
  Discuss = 4,
}

export enum TabName {
  SignIn = '签到',
  Hw = '作业',
  Resource = '资源区',
  Discuss = '讨论区',
}

export type Record = {
  content: string;
  accessory: string[];
};

export interface SignIn {
  id: string;
  description: string;
  expire_at: string;
  extra: any;
}

export enum SignInStatus {
  Signed = 0,
  Signing = 1,
  Expired = 2,
}

export interface HW {
  batch_id: string;
  description: string;
  expire_at: string;
  // hand_in_count: number;
  extra: any;
}
