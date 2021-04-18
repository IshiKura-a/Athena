import { action, observable } from 'mobx';
import { BaseStore } from '@/store';

export default class ProfileStore {
  @observable name = '张天然';
  @observable id = '3180102086';
  @observable department = '计算机科学与技术';
  @observable telephone = '15336527322';
  @observable email = 'holly1027@zju.edu.cn';

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

  @action setTelephone(telephone: string) {
    this.telephone = telephone;
  }

  @action setEmail(email: string) {
    this.email = email;
  }

  @action editEmail = async(email) => {
     // console.log("edit telephone");
     this.email = email;
  }

  @action editTelephone = async(telephone) => {
    // console.log("edit telephone");
    this.telephone = telephone;
  }
}
