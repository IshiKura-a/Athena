import HomePageStore from '@/pages/Home/model';
import ProfileStore from '@/pages/Profile/model';
import LoginStore, { RoleType } from '@/pages/Login/model';
import { action, observable, computed } from 'mobx';
import { TodoListStore } from '@/components/TodoList/model';
import SectionStore from '@/pages/Section/model';
import SignInStore from '@/components/SignIn/model';
import HomeworkStore from '@/components/HomeWork/model';
import DiscussionStore from '@/components/Discussion/model';
import ResourceStore from '@/components/Resource/model';
import { NotifyListStore } from './components/Notification/model';

export class BaseStore {
  @observable id = '';
  @observable name = '';
  @observable type = RoleType.student;

  @action setId(id: string) {
    this.id = id;
  }

  @action setType(type: RoleType) {
    this.type = type;
  }

  getId() {
    return this.id;
  }

  @action setName(name: string) {
    this.name = name;
  }

  @computed get getName() {
    return this.name;
  }
}

const baseStore = new BaseStore();
const signInStore = new SignInStore(baseStore);
const hwStore = new HomeworkStore(baseStore);
const discussionStore = new DiscussionStore(baseStore);
const resourceStore = new ResourceStore(baseStore);
export default {
  baseStore,
  homePageStore: new HomePageStore(baseStore),
  profileStore: new ProfileStore(baseStore),
  loginStore: new LoginStore(baseStore),
  todoListStore: new TodoListStore(baseStore),
  notifyListStore: new NotifyListStore(baseStore),
  signInStore,
  hwStore,
  discussionStore,
  resourceStore,
  sectionStore: new SectionStore(baseStore, signInStore, hwStore, discussionStore, resourceStore),
};
