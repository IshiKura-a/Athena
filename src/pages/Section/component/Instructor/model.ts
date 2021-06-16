import { action, computed, observable } from 'mobx';
import type { BaseStore } from '@/store';
import { cloneDeep } from 'lodash';
import type { paramsHwList } from '@/services/section';
import { createSignIn, listHw, listSignIn } from '@/services/section';
import { cmpTime } from '@/pages/Home';
import { history } from 'umi';
import { instructorInfo, createHW } from '@/pages/Section/component/Instructor/service';

type InstHW = {
  id: string;
  name: string;
  record: Record;
};

interface SignIn {
  id: string;
  description: string;
  expire_at: string;
  extra: { id: number; name: string }[];
}

interface HW {
  id: string;
  description: string;
  expire_at: string;
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
          ?.course_id
      : undefined;
  }

  @computed get dataToCheck() {
    return this.isCheck
      ? this.hwList.filter((item) => item.id === this.isCheck)[0].extra
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
    console.log('lessonList', response);
    this.setLessonList(response.teaches);
  };

  @action listSign = async () => {
    if (this.currentLesson) {
      const response = await listSignIn({ section_id: this.currentLesson });
      console.log('signin', response);
      this.setSignInList(response);
    } else {
      console.log('list sign current empty');
    }
  };

  @action createSign = async () => {
    if (this.currentLesson) {
      const response = await createSignIn({
        section_id: this.currentLesson,
        description: 'test',
        expire_at: '2021-6-7 22:30:00',
      });
      if (response.message === 'ok') {
        if (this.currentLesson) await this.listSign();
      }
    }
  };

  @action listHw = async (params: paramsHwList) => {
    const response = await listHw(params);
    if (response.message === 'ok') {
      this.setHwList(response.data);
    }
  };

  @action createHW = async (params: string) => {
    const response = await createHW(params);
    if (response.message === 'ok') {
      await this.listHw({ stuID: '0', role: this.baseStore.type, sectionID: '0' });
    }
  };
}
