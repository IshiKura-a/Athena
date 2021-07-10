import type { BaseStore } from '@/store';
import { action, computed, observable, reaction } from 'mobx';
import type { HW } from '@/pages/Section/type';
import { cloneDeep } from 'lodash';
import { cmpTime } from '@/pages/Home';
import type { paramsCheckHW } from './service';
import { checkHW, createHW, handInHw, listHw } from './service';
import { message } from 'antd';

export default class HomeworkStore {
  // -----instructor----------
  // create homework
  @observable hwCreate = false;
  // which homework is to be checked
  @observable isCheck = undefined as string | undefined;
  // modal of homework hand-in list
  @observable checkModalVisible = false;

  // ---------student----------
  // which is to be hand in
  @observable isHandIn = undefined as string | undefined;
  // modal of homework to hand in
  @observable handInModalVisible = false;

  @observable hwList = [] as HW[];

  @observable currentLesson = undefined as string | undefined;
  @observable currentLessonName = undefined as string | undefined;
  @observable isLoading = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
    reaction(
      () => this.currentLesson,
      (data: any) => {
        this.listHw();
      },
      { fireImmediately: false },
    );
  }

  // student
  // get records of homework handing in
  @computed get recordsToShow() {
    return this.isHandIn
      ? this.hwList.filter((item) => item.extra.id === this.isHandIn)[0].extra.records
      : undefined;
  }

  @action setHandInModalVisible = (value: boolean) => {
    this.handInModalVisible = value;
  };

  @action setIsHandIn = (id: string | undefined) => {
    this.isHandIn = id;
  };

  // instructor
  @computed get dataToCheck() {
    return this.isCheck
      ? this.hwList.filter((item) => item.batch_id === this.isCheck)[0].extra
      : undefined;
  }

  @action setIsCheck = (id: string | undefined) => {
    this.isCheck = id;
  };

  @action setHwCreate = (value: boolean) => {
    this.hwCreate = value;
  };

  @action setCheckModalVisible = (value: boolean) => {
    this.checkModalVisible = value;
  };

  @action setCurrentLesson(section_id: string) {
    this.currentLesson = section_id;
  }

  @action setHwList(hwList: HW[]) {
    this.hwList = cloneDeep(
      hwList.sort((x, y) => cmpTime(x.expire_at, y.expire_at, 'YYYY-MM-DD HH:mm')),
    );
  }

  @action listHw = async () => {
    if (this.currentLesson) {
      this.setLoading(true);
      const response = await listHw({ section_id: this.currentLesson });
      this.setHwList(response);
      this.setLoading(false);
    }
  };

  @action handInHw = async (params: any) => {
    const response = await handInHw({ id: this.isHandIn, ...params });
    if (response.message === 'ok') {
      await this.listHw();
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

  @action setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
