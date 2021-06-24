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
  SignIn = 1,
  SubmitHW = 2,
  Resource = 3,
  Discuss = 4,
}

export enum InstuctorFeats {
  SignIn = 1,
  Review = 2,
  Resource = 3,
  Discuss = 4,
}
