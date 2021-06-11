import { action, computed, observable } from 'mobx';
import type { BaseStore } from '@/store';
import type { LessonReq } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { fetchLesson } from '@/services/homepage';
import type { paramsHwList, paramsSignInList } from '@/services/section';
import { createSignIn, listHw, listSignIn, updateSignIn } from '@/services/section';
import { cmpTime } from '@/pages/Home';

type Record = {
  content: string;
  accessory: string[];
};

type StuHW = {
  status: number;
  isExpire: boolean;
  score?: number;
  records: Record[];
};

type InstHW = {
  id: string;
  name: string;
  record: Record;
};

export interface SignIn {
  id: string;
  description: string;
  expireAt: string;
  extra: number | { id: number; name: string }[];
}

export interface HW {
  id: string;
  description: string;
  expireAt: string;
  extra: StuHW | InstHW[];
}

export default class SectionStore {
  @observable isSign = '';
  @observable signInCreate = false;
  @observable modalVisible = false;
  @observable polling = false;
  @observable signInShow = undefined as string | undefined;

  @observable lessonList = [] as LessonReq[];
  @observable signInList = [] as SignIn[];
  @observable hwList = [] as HW[];
  @observable currentLesson: string = '';

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  getSignInStatistic = (id: string) => {
    return [40, 60];
  };

  @computed get dataToShow() {
    const it = this.signInList
      ? this.signInList.filter((item: SignIn) => item.id === this.signInShow)[0]
      : undefined;
    return it;
  }

  @computed get lessonName() {
    return 'lesson';
    // return this.lessonList.length > 0?this.lessonList.filter((item: LessonReq) => item.course_id === this.currentLesson)[0].course_name:undefined;
  }

  @action setSignInCreate = (value: boolean) => {
    this.signInCreate = value;
  };

  @action setModalVisible = (value: boolean) => {
    this.modalVisible = value;
  };

  @action setPolling = (value: boolean) => {
    this.polling = value;
  };

  @action setSignInShow = (id: string | undefined) => {
    this.signInShow = id;
  };

  @action setIsSign = (id: string) => {
    this.isSign = id;
  };

  @action handleRoute = (sectionID: string) => {
    if (sectionID === ':sectionID') {
      if (this.lessonList.length > 0) {
        this.setCurrentLesson(this.lessonList[0].course_id);
      }
    } else {
      this.setCurrentLesson(sectionID);
      console.log('current:', this.currentLesson);
    }
    console.log('setCurrentLesson:', this.currentLesson);
  };

  @action setCurrentLesson(courseId: string) {
    this.currentLesson = courseId;
  }

  @action setLessonList(lessonList: LessonReq[]) {
    this.lessonList = cloneDeep(lessonList);
  }

  @action setSignInList(signInList: SignIn[]) {
    this.signInList = cloneDeep(
      signInList.sort((x, y) => cmpTime(x.expireAt, y.expireAt, 'HH:mm')),
    );
  }

  @action setHwList(hwList: HW[]) {
    this.hwList = cloneDeep(hwList.sort((x, y) => cmpTime(x.expireAt, y.expireAt, 'HH:mm')));
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
      console.log('type:', this.baseStore.type);
    }
  };

  @action updateSign = async (id: string) => {
    const response = await updateSignIn({ id, stuID: '0' });
    if (response.message === 'ok') {
      this.listSign({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };

  @action listHw = async (params: paramsHwList) => {
    const response = await listHw(params);
    console.log('hw:', response);
    if (response.message === 'ok') {
      this.setHwList(response.data);
    }
  };
}
