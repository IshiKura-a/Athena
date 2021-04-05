import { cloneDeep } from 'lodash';
import { action, observable } from 'mobx';
import HomePageStore from '@/pages/Home/model';
import ProfileStore from '@/pages/Profile/model';

export class BaseStore {
  @observable token = '';

  @action setToken(token: string) {
    this.token = cloneDeep(token);
  }
}

const baseStore = new BaseStore();
export default {
  baseStore,
  homePageStore: new HomePageStore(baseStore),
  profileStore: new ProfileStore(baseStore),
};
