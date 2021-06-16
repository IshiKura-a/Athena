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
