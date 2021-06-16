export interface SignIn {
  id: string;
  description: string;
  expire_at: string;
  extra: number | { id: number; name: string }[];
}

export type Record = {
  content: string;
  accessory: string[];
};

export type StuHW = {
  status: number;
  isExpire: boolean;
  score?: number;
  records: Record[];
};

export type InstHW = {
  id: string;
  name: string;
  record: Record;
};

export enum StudentFeats {
  SignIn = '签到',
  SubmitHW = '提交作业',
  Resource = '课程资料',
  Discuss = '讨论区',
}

export enum InstuctorFeats {
  Named = '点名',
  Review = '批改作业',
  Discuss = '讨论区',
}
