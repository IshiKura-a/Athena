export type Record = {
  content: string;
  accessory: string[];
};

export type InstHW = {
  id: string;
  student_id: string;
  name: string;
  score?: number;
  record?: Record;
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
