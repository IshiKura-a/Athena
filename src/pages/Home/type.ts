type LessonTime = {
  day: number;
  start_time: string;
  end_time: string;
};
export enum Day {
  Mon = 'Monday',
  Tues = 'Tuesday',
  Wed = 'Wednesday',
  Thu = 'Thursday',
  Fri = 'Friday',
  Sat = 'Saturday',
  Sun = 'Sunday',
}

export interface Lesson {
  course_id: string;
  course_name: string;
  instructor?: string;
  address?: string;
  department?: string;
  day: number;
  start_time: string;
  end_time: string;
}

export interface LessonReq {
  course_id: string;
  course_name: string;
  instructor?: string;
  address?: string;
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
