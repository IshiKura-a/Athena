import { cloneDeep } from 'lodash';
import { action, observable, reaction } from 'mobx';
import HomePageStore from '@/pages/Home/model';
import ProfileStore from '@/pages/Profile/model';
import LoginStore from '@/pages/Login/model';
import { getCookie, setCookie } from '@/utils/utils';

export class BaseStore {
  @observable token = getCookie('JWT-Token');

  constructor() {
    reaction(
      () => ({
        token: this.token,
      }),
      (val) => {
        setCookie('JWT-Token', val.token);
      },
      { fireImmediately: true },
    );
  }
  @action setToken(token: string) {
    this.token = cloneDeep(token);
  }
}

const baseStore = new BaseStore();
export default {
  baseStore,
  homePageStore: new HomePageStore(baseStore),
  profileStore: new ProfileStore(baseStore),
  loginStore: new LoginStore(baseStore),
};
