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
  name: string;
  instructor: string;
  address: string;
  department: string;
  startTime: string;
  endTime: string;
  date: Day;
}

export const timeFormat = 'hh:mm';

export interface ToDo {
  id: number;
  title: string;
  finished: boolean;
  description?: string;
  start_time?: string;
  end_time?: string;
}
