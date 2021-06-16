import { action, observable } from 'mobx';
import type { Lesson, LessonReq } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import type { BaseStore } from '@/store';
import { fetchLesson } from '@/services/homepage';
import { Day } from '@/pages/Home/type';

export default class HomePageStore {
  @observable msg = [];
  @observable lessonInfo: Lesson[] = [];
  week = new Map([
    [Day.Mon, 1],
    [Day.Tues, 2],
    [Day.Wed, 3],
    [Day.Thu, 4],
    [Day.Fri, 5],
    [Day.Sat, 6],
    [Day.Sun, 0],
  ]);

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  expandLesson(lessons: LessonReq[]) {
    const newLesson: Lesson[] = [];
    lessons.forEach((item) => {
      const { _id, section_id, course_id, course_name, instructor, location, department, time } =
        item;
      time.forEach((t) => {
        const aLesson: Lesson = {
          _id,
          section_id,
          course_id,
          course_name,
          instructor,
          location,
          department,
          ...t,
        };
        newLesson.push(aLesson);
      });
    });
    return newLesson;
  }

  @action setLessonInfo(lessonInfo: Lesson[]) {
    this.lessonInfo = cloneDeep(lessonInfo);
  }

  @action fetchLessonInfo = async () => {
    const { id } = this.baseStore;
    // console.log("baseStore.id",id)
    const response = await fetchLesson({ id });
    this.setLessonInfo(this.expandLesson(response));
  };
}
