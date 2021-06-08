import HomePageStore from '@/pages/Home/model';
import ProfileStore from '@/pages/Profile/model';
import LoginStore, { RoleType } from '@/pages/Login/model';
import { action, observable } from 'mobx';
import { TodoListStore } from '@/components/TodoList/model';
import SectionStore from '@/pages/Section/[sectionID]/model';

export class BaseStore {
  @observable id = '';
  @observable type = RoleType.student;

  getId() {
    return this.id;
  }

  @action setId(id: string) {
    this.id = id;
  }

  @action setType(type: RoleType) {
    this.type = type;
  }
}

const baseStore = new BaseStore();
export default {
  baseStore,
  homePageStore: new HomePageStore(baseStore),
  profileStore: new ProfileStore(baseStore),
  loginStore: new LoginStore(baseStore),
  todoListStore: new TodoListStore(baseStore),
  sectionStore: new SectionStore(baseStore),
};
