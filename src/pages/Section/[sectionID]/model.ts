import { action, observable } from 'mobx';
import type { BaseStore } from '@/store';
import type { LessonReq } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { fetchLesson } from '@/services/homepage';
import type { paramsSignInList} from '@/services/section';
import { createSignIn, listSignIn, updateSignIn } from '@/services/section';
import moment from 'moment';

export interface SignIn {
  id: string;
  description: string;
  expireAt: string;
  extra: number | { id: number; name: string }[];
}

export default class SectionStore {
  @observable isSign = '';
  @observable lessonList: LessonReq[] = [];
  @observable currentLesson: string = '';
  @observable signInList: SignIn[] = [];

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  cmpTime = (timeA: string, timeB: string) => {
    const format = 'YYYY-MM-DD HH:mm:ss';
    const A = moment(timeA, format);
    const B = moment(timeB, format);
    return A.diff(B);
  };

  @action setIsSign = (id: string) => {
    this.isSign = id;
  };

  @action handleRoute = (sectionID: string) => {
    console.log('atHandleRoute:', sectionID);
    if (sectionID === ':sectionID') {
      if (this.lessonList.length > 0) {
        this.setCurrentLesson(this.lessonList[0].course_id);
      }
    } else {
      this.setCurrentLesson(sectionID);
    }
  };

  @action setCurrentLesson(courseId: string) {
    this.currentLesson = courseId;
  }

  @action setLessonList(lessonList: LessonReq[]) {
    this.lessonList = cloneDeep(lessonList);
  }

  @action setSignInList(signInList: SignIn[]) {
    this.signInList = cloneDeep(signInList.sort((x, y) => this.cmpTime(x.expireAt, y.expireAt)));
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

  getSignInStatistic = (id: string) => {
    return [40, 60];
  };

  @action listSign = async (params: paramsSignInList) => {
    const response = await listSignIn(params);
    if (response.message === 'ok') {
      this.setSignInList(response.data);
    }
  };

  @action createSign = async () => {
    const response = await createSignIn({
      sectionID: '0',
      description: 'test',
      expireAt: '2021-6-7 22:30:00',
    });
    if (response.message === 'ok') {
      this.listSign({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };

  @action updateSign = async (id: string) => {
    const response = await updateSignIn({ id, stuID: '0' });
    if (response.message === 'ok') {
      this.listSign({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };
}
