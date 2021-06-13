import { action, computed, observable } from 'mobx';
import type { BaseStore } from '@/store';
import type { LessonReq } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { fetchLesson } from '@/services/homepage';
import type { paramsHwHandIn, paramsHwList, paramsSignInList } from '@/services/section';
import { createSignIn, handInHw, listHw, listSignIn, updateSignIn } from '@/services/section';
import { cmpTime } from '@/pages/Home';
import { history } from 'umi';
import section from '../../../../mock/section';

export type Record = {
  content: string;
  accessory: string[];
};

export type StuHW = {
  status: number;
  isExpire: boolean;
  score?: number;
  records: Record[];
};

export type InstHW = {
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
  // create sign in
  @observable signInCreate = false;
  // which is to be signed in
  @observable isSign = undefined as string | undefined;
  // modal of sign in in detail
  @observable modalVisible = false;
  // whether it'll polling
  @observable polling = false;
  // which sign is to be shown im detail
  @observable signInShow = undefined as string | undefined;
  // create homework
  @observable hwCreate = false;
  // which is to be hand in
  @observable isHandIn = undefined as string | undefined;
  // modal of homework to hand in
  @observable handInModalVisible = false;
  // which homework is to be checked
  @observable isCheck = undefined as string | undefined;
  // modal of homework hand-in list
  @observable checkModalVisible = false;

  @observable lessonList = [] as LessonReq[];
  @observable signInList = [] as SignIn[];
  @observable hwList = [] as HW[];
  @observable currentLesson = undefined as string | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  redirectRoute = (sectionID: string) => {
    history.push({
      pathname: `/section/${sectionID}`,
    });
    this.setCurrentLesson(sectionID);
  };

  handleRoute = (sectionID: string) => {
    if (sectionID === undefined || sectionID === ':sectionID') {
      const defaultID = this.lessonList[0]?.course_id;
      this.redirectRoute(defaultID);
      this.setCurrentLesson(defaultID);
      // TODO
    } else {
      this.setCurrentLesson(sectionID);
    }
  };

  @computed get dataToShow() {
    return this.signInList
      ? this.signInList.filter((item: SignIn) => item.id === this.signInShow)[0]
      : undefined;
  }

  @computed get lessonName() {
    return this.currentLesson
      ? this.lessonList.filter((item: LessonReq) => item.course_id === this.currentLesson)[0]
          ?.course_name
      : undefined;
  }

  @computed get recordsToShow() {
    return this.isHandIn
      ? this.hwList.filter((item) => item.id === this.isHandIn)[0].extra.records
      : undefined;
  }

  @computed get dataToCheck() {
    return this.isCheck
      ? this.hwList.filter((item) => item.id === this.isCheck)[0].extra
      : undefined;
  }

  @action setSignInCreate = (value: boolean) => {
    this.signInCreate = value;
  };

  @action setHwCreate = (value: boolean) => {
    this.hwCreate = value;
  };

  @action setModalVisible = (value: boolean) => {
    this.modalVisible = value;
  };

  @action setHandInModalVisible = (value: boolean) => {
    this.handInModalVisible = value;
  };

  @action setCheckModalVisible = (value: boolean) => {
    this.checkModalVisible = value;
  };

  @action setPolling = (value: boolean) => {
    this.polling = value;
  };

  @action setSignInShow = (id: string | undefined) => {
    this.signInShow = id;
  };

  @action setIsSign = (id: string | undefined) => {
    this.isSign = id;
  };

  @action setIsHandIn = (id: string | undefined) => {
    this.isHandIn = id;
  };

  @action setIsCheck = (id: string | undefined) => {
    this.isCheck = id;
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
      // this.setCurrentLesson(this.lessonList.length > 0 ? this.lessonList[0].course_id : '');
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
      await this.listSign({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };

  @action updateSign = async (id: string) => {
    const response = await updateSignIn({ id, stuID: '0' });
    if (response.message === 'ok') {
      await this.listSign({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };

  @action listHw = async (params: paramsHwList) => {
    const response = await listHw(params);
    if (response.message === 'ok') {
      this.setHwList(response.data);
    }
  };

  @action handInHw = async (params: paramsHwHandIn) => {
    const response = await handInHw(params);
    if (response.message === 'ok') {
      await this.listHw({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };
}
