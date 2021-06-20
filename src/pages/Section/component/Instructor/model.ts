import { action, computed, observable } from 'mobx';
import type { BaseStore } from '@/store';
import { cloneDeep } from 'lodash';
import { cmpTime } from '@/pages/Home';
import { history } from 'umi';
import { listHw, listSignIn } from '@/services/section';
import type { paramsCheckHW } from '@/pages/Section/component/Instructor/service';
import {
  instructorInfo,
  createHW,
  checkHW,
  createSignIn,
} from '@/pages/Section/component/Instructor/service';
import type { InstHW } from '@/pages/Section/[sectionID]/type';
import { message } from 'antd';

export interface SignIn {
  id: string;
  description: string;
  expire_at: string;
  signed_students_count: number;
  students_total: number;
  extra: { id: number; name: string }[];
}

interface HW {
  batch_id: string;
  description: string;
  expire_at: string;
  hand_in_count: number;
  extra: InstHW[];
}

export type InstLesson = {
  course_id: string;
  section_id: string;
  course_name: string;
};

export default class InstructorStore {
  // modal of sign in in detail
  @observable signInModalVisible = false;
  // create sign in
  @observable signInCreate = false;
  // whether it'll polling
  @observable polling = false;
  // which sign is to be shown im detail
  @observable signInShow = undefined as string | undefined;

  // create homework
  @observable hwCreate = false;
  // which homework is to be checked
  @observable isCheck = undefined as string | undefined;
  // modal of homework hand-in list
  @observable checkModalVisible = false;

  @observable lessonList = [] as InstLesson[];
  @observable signInList = [] as SignIn[];
  @observable hwList = [] as HW[];

  @observable currentLesson = undefined as string | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  requestAgain = async () => {
    if (this.currentLesson) {
      await this.listSign();
      await this.listHw();
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

  @computed get dataToShow() {
    return this.signInList
      ? this.signInList.filter((item: SignIn) => item.id === this.signInShow)[0]
      : undefined;
  }

  @computed get lessonName() {
    return this.currentLesson
      ? this.lessonList.filter((item: InstLesson) => item.section_id === this.currentLesson)[0]
          ?.course_name
      : undefined;
  }

  @computed get dataToCheck() {
    return this.isCheck
      ? this.hwList.filter((item) => item.batch_id === this.isCheck)[0].extra
      : undefined;
  }

  @action setSignInModalVisible = (value: boolean) => {
    this.signInModalVisible = value;
  };

  @action setSignInCreate = (value: boolean) => {
    this.signInCreate = value;
  };

  @action setHwCreate = (value: boolean) => {
    this.hwCreate = value;
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

  @action setIsCheck = (id: string | undefined) => {
    this.isCheck = id;
  };

  @action setCurrentLesson(courseId: string) {
    this.currentLesson = courseId;
  }

  @action setLessonList(lessonList: InstLesson[]) {
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
    const response = await instructorInfo(this.baseStore.id);
    this.setLessonList(response.teaches);
  };

  @action listSign = async () => {
    if (this.currentLesson) {
      const response = await listSignIn({ section_id: this.currentLesson });
      console.log('sign', response);
      this.setSignInList(response);
    }
  };

  @action createSign = async (data: any) => {
    if (this.currentLesson) {
      const response = await createSignIn({
        section_id: this.currentLesson,
        description: data.description,
        expire_at: data.expire_at,
      });
      if (response.message === 'ok') {
        if (this.currentLesson) await this.listSign();
      }
    }
  };

  @action listHw = async () => {
    if (this.currentLesson) {
      const response = await listHw({ section_id: this.currentLesson });
      this.setHwList(response);
    }
  };

  @action createHW = async (params: any) => {
    const response = await createHW({ section_id: this.currentLesson, ...params });
    if (response.message === 'ok') {
      await this.listHw();
    }
  };

  @action checkHW = async (params: paramsCheckHW) => {
    const response = await checkHW(params);
    if (response.message === 'ok') {
      message.success('评分成功');
      await this.listHw();
    }
  };
}
