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
  startTime: string;
  endTime: string;
  date: Day;
}

export const timeFormat = 'hh:mm';
