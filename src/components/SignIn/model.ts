import type { BaseStore } from '@/store';
import { action, computed, observable } from 'mobx';
import type { SignIn } from '@/pages/Section/type';
import { cloneDeep } from 'lodash';
import { createSignIn, listSignIn, updateSignIn } from '@/components/SignIn/service';
import { cmpTime } from '@/pages/Home';

export default class SignInStore {
  // -----instructor-----
  // modal of sign in in detail
  @observable signInModalVisible = false;
  // create sign in
  @observable signInCreate = false;
  // whether it'll polling
  @observable polling = false;
  // which sign is to be shown im detail
  @observable signInShow = undefined as string | undefined;

  // --------student---------
  // which is to be signed in
  @observable isSign = undefined as string | undefined;
  @observable signInList = [] as SignIn[];

  @observable currentLesson = undefined as string | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  // student
  @action setIsSign = (id: string | undefined) => {
    this.isSign = id;
  };

  // instructor
  @computed get dataToShow() {
    return this.signInList
      ? this.signInList.filter((item: SignIn) => item.id === this.signInShow)[0]
      : undefined;
  }

  @action setCurrentLesson(section_id: string) {
    this.currentLesson = section_id;
  }

  @action setSignInModalVisible = (value: boolean) => {
    this.signInModalVisible = value;
  };

  @action setSignInCreate = (value: boolean) => {
    this.signInCreate = value;
  };

  @action setPolling = (value: boolean) => {
    this.polling = value;
  };

  @action setSignInShow = (id: string | undefined) => {
    this.signInShow = id;
  };

  @action setSignInList(signInList: SignIn[]) {
    this.signInList = cloneDeep(
      signInList.sort((x, y) => cmpTime(x.expire_at, y.expire_at, 'YYYY-MM-DD HH:mm')),
    );
  }

  @action listSign = async () => {
    if (this.currentLesson) {
      const response = await listSignIn({ section_id: this.currentLesson });
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

  @action updateSign = async (id: string) => {
    const response = await updateSignIn({ id });
    if (response.message === 'Sign in succeeded') {
      if (this.currentLesson) await this.listSign();
    }
  };
}
