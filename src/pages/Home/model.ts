import { action, observable } from 'mobx';
import type { Lesson } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import type { BaseStore } from '@/store';
import { fetchLesson } from '@/services/homepage';

export default class HomePageStore {
  @observable msg = [];
  @observable lessonInfo: Lesson[] = [];

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action setLessonInfo(lessonInfo: Lesson[]) {
    this.lessonInfo = cloneDeep(lessonInfo);
  }

  @action fetchLessonInfo = async () => {
    const response = await fetchLesson({ id: this.baseStore.getId() }, this.baseStore.token);
    if (response.message === 'ok') {
      console.log('filter.find', response.lessonInfo);
      this.setLessonInfo(response.lessonInfo);
    } else {
      console.log('fetch lesson error');
    }
  };
}
