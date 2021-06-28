type LessonTime = {
  day: number;
  start_time: string;
  end_time: string;
};
export enum Day {
  Mon = '周一',
  Tues = '周二',
  Wed = '周三',
  Thu = '周四',
  Fri = '周五',
  Sat = '周六',
  Sun = '周日',
}

export interface Lesson {
  _id: string;
  section_id: string;
  course_id: string;
  course_name: string;
  instructor?: string;
  location: string;
  department?: string;
  day: number;
  start_time: string;
  end_time: string;
}

export interface LessonReq {
  _id: string;
  section_id: string;
  course_id: string;
  course_name: string;
  instructor?: string;
  location: string;
  department?: string;
  time: LessonTime[];
}

export const timeFormat = 'hh:mm';

export interface ToDo {
  _id: number;
  title: string;
  finished: boolean;
  description?: string;
  start_time?: string;
  end_time?: string;
}
