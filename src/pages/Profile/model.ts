import { action, observable } from 'mobx';
import { BaseStore } from '@/pages/store';

export default class ProfileStore {
  @observable name = 'ssa';
  @observable id = '3180102086';
  @observable department = '计算机科学与技术';

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action setName(name: string) {
    this.name = name;
  }

  @action setId(id: string) {
    this.id = id;
  }

  @action setDepartment(department: string) {
    this.department = department;
  }
}
