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
      const { course_id, course_name, instructor, address, department, time } = item;
      time.forEach((t) => {
        const aLesson: Lesson = { course_id, course_name, instructor, address, department, ...t };
        newLesson.push(aLesson);
      });
    });
    console.log(newLesson);
    return newLesson;
  }

  @action setLessonInfo(lessonInfo: Lesson[]) {
    this.lessonInfo = cloneDeep(lessonInfo);
  }

  @action fetchLessonInfo = async () => {
    const response = await fetchLesson({ id: this.baseStore.getId() });
    if (response.message === 'ok') {
      this.setLessonInfo(this.expandLesson(response.lessonInfo));
    } else {
      console.log('fetch lesson error');
    }
  };
}
