import { cloneDeep } from 'lodash';
import { action, observable, reaction } from 'mobx';
import HomePageStore from '@/pages/Home/model';
import ProfileStore from '@/pages/Profile/model';
import LoginStore from '@/pages/Login/model';
import { getCookie, setCookie } from '@/utils/utils';
import ToDoListStore from '@/pages/Home/component/todoModel';

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

  getId() {
    return '3180100000';

    // if(this.token !== null) {
    //   const user = JSON.parse(this.token);
    //   console.log(user)
    //   return user.aid;
    // }
    // return null;
  }

  @action setToken(token: string) {
    this.token = cloneDeep(token);
    console.log('token', this.token);
  }
  @action getToken() {
    return this.token;
  }
}

const baseStore = new BaseStore();
export default {
  baseStore,
  homePageStore: new HomePageStore(baseStore),
  profileStore: new ProfileStore(baseStore),
  loginStore: new LoginStore(baseStore),
  todoListStore: new ToDoListStore(baseStore),
};
