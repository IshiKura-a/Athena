import { action, observable } from 'mobx';
import type { BaseStore } from '@/store';

export default class ProfileStore {
  @observable name = 'ssa';
  @observable department = '计算机科学与技术';

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action setName(name: string) {
    this.name = name;
  }

  @action setId(id: string) {
    console.error('set id in profile deprecated');
  }

  @action setDepartment(department: string) {
    this.department = department;
  }
}
