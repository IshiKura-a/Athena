import { action, observable } from 'mobx';
import type { BaseStore } from '@/store';
import type { LessonReq } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { fetchLesson } from '@/services/homepage';
import { createSignIn, listSignIn, updateSignIn } from '@/services/section';

export interface SignIn {
  id: number;
  description: string;
  expireAt: string;
  extra: number | { id: number; name: string }[];
}

export default class SectionStore {
  @observable lessonList: LessonReq[] = [];
  @observable currentLesson: string = '';
  @observable signInList: SignIn[] = [];

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action setCurrentLesson(courseId: string) {
    this.currentLesson = courseId;
  }

  @action setLessonList(lessonList: LessonReq[]) {
    this.lessonList = cloneDeep(lessonList);
  }

  @action setSignInList(signInList: SignIn[]) {
    this.signInList = cloneDeep(signInList);
  }

  @action fectchLessonList = async () => {
    const response = await fetchLesson({ id: this.baseStore.getId() });
    if (response.message === 'ok') {
      this.setLessonList(response.lessonInfo);
      this.setCurrentLesson(this.lessonList.length > 0 ? this.lessonList[0].course_id : '');
    } else {
      console.log('fetch lesson error');
    }
  };

  @action listSign = async () => {
    const response = await listSignIn({ stuID: 0, role: this.baseStore.type, sectionID: '0' });
    if (response.message === 'ok') {
      this.setSignInList(response.data);
    }
  };

  @action createSign = async () => {
    const response = await createSignIn({
      sectionID: '0',
      description: 'test',
      expireAt: '2021-6-7T22:30:00.000Z',
    });
    if (response.message === 'ok') {
      this.listSign();
    }
  };

  @action updateSign = async (id: number) => {
    const response = await updateSignIn({ id, stuID: 0 });
    if (response.message === 'ok') {
      this.listSign();
    }
  };
}
