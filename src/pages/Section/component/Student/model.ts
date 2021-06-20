import { action, computed, observable } from 'mobx';
import type { BaseStore } from '@/store';
import type { LessonReq } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { fetchLesson } from '@/services/homepage';
import { cmpTime } from '@/pages/Home';
import { history } from 'umi';
import type { Record } from '@/pages/Section/[sectionID]/type';
import type { paramsSignInList } from '@/services/section';
import { listHw, listSignIn } from '@/services/section';
import { handInHw, updateSignIn } from '@/pages/Section/component/Student/service';

type StuHW = {
  id: string;
  status: number;
  is_expire: boolean;
  score?: number;
  records: Record[];
};

export interface SignIn {
  id: string;
  description: string;
  expire_at: string;
  extra: number;
}

interface HW {
  batch_id: string;
  description: string;
  expire_at: string;
  extra: StuHW;
}

export default class StudentStore {
  // which is to be signed in
  @observable isSign = undefined as string | undefined;

  // which is to be hand in
  @observable isHandIn = undefined as string | undefined;
  // modal of homework to hand in
  @observable handInModalVisible = false;

  @observable lessonList = [] as LessonReq[];
  @observable signInList = [] as SignIn[];
  @observable hwList = [] as HW[];
  @observable currentLesson = undefined as string | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  requestAgain = async () => {
    if (this.currentLesson) {
      await this.listSign({ section_id: this.currentLesson });
      await this.listHw({ section_id: this.currentLesson });
    }
  };

  redirectRoute = (sectionID: string) => {
    history.push({
      pathname: `/section/${sectionID}`,
    });
    this.setCurrentLesson(sectionID);
    this.requestAgain();
  };

  handleRoute = (sectionID: string | undefined) => {
    if (sectionID === undefined || sectionID === ':sectionID') {
      if (this.lessonList.length > 0) {
        const defaultID = this.lessonList[0].section_id;
        this.redirectRoute(defaultID);
      }
    } else {
      this.setCurrentLesson(sectionID);
      this.requestAgain();
    }
  };

  @computed get lessonName() {
    return this.currentLesson
      ? this.lessonList.filter((item: LessonReq) => item.section_id === this.currentLesson)[0]
          ?.course_name
      : undefined;
  }

  @computed get recordsToShow() {
    return this.isHandIn
      ? this.hwList.filter((item) => item.extra.id === this.isHandIn)[0].extra.records
      : undefined;
  }

  @action setHandInModalVisible = (value: boolean) => {
    this.handInModalVisible = value;
  };

  @action setIsSign = (id: string | undefined) => {
    this.isSign = id;
  };

  @action setIsHandIn = (id: string | undefined) => {
    this.isHandIn = id;
  };

  @action setCurrentLesson(courseId: string) {
    this.currentLesson = courseId;
  }

  @action setLessonList(lessonList: LessonReq[]) {
    this.lessonList = cloneDeep(lessonList);
  }

  @action setSignInList(signInList: SignIn[]) {
    this.signInList = cloneDeep(
      signInList.sort((x, y) => cmpTime(x.expire_at, y.expire_at, 'HH:mm')),
    );
  }

  @action setHwList(hwList: HW[]) {
    this.hwList = cloneDeep(hwList.sort((x, y) => cmpTime(x.expire_at, y.expire_at, 'HH:mm')));
  }

  @action fectchLessonList = async () => {
    const response = await fetchLesson({ id: this.baseStore.id });
    this.setLessonList(response);
  };

  @action listSign = async (params: paramsSignInList) => {
    if (this.currentLesson) {
      const response = await listSignIn({ section_id: this.currentLesson });
      this.setSignInList(response);
    } else {
      console.log('list sign current empty');
    }
  };

  @action updateSign = async (id: string) => {
    const response = await updateSignIn({ id });
    if (response.message === 'Sign in succeeded') {
      if (this.currentLesson) await this.listSign({ section_id: this.currentLesson });
    }
  };

  @action listHw = async (params: any) => {
    const response = await listHw(params);
    this.setHwList(response);
  };

  @action handInHw = async (params: any) => {
    const response = await handInHw({ id: this.isHandIn, ...params });
    if (response.message === 'ok') {
      await this.listHw({ section_id: this.currentLesson });
    }
  };
}
