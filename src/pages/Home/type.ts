export type lessonTime = {
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

export const week = new Map([
  [Day.Mon, 1],
  [Day.Tues, 2],
  [Day.Wed, 3],
  [Day.Thu, 4],
  [Day.Fri, 5],
  [Day.Sat, 6],
  [Day.Sun, 0],
]);

export interface Lesson {
  course_id: string;
  course_name: string;
  instructor?: string;
  address?: string;
  department?: string;
  time: lessonTime[];
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
