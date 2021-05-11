import { action, observable } from 'mobx';
import { BaseStore } from '@/store';

export default class ProfileStore {
  @observable name = '张天然';
  @observable id = '3180102086';
  @observable department = '计算机科学与技术';
  @observable telephone = '15336527322';
  @observable email = 'holly1027@zju.edu.cn';
  @observable wechat = '15336527322';
  @observable qq = '1139872552';
  @observable gender = '女';
  @observable campus = '玉泉';
  @observable birthday = '2000-10-27';
  @observable blood = 'O';
  @observable status = 2;

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

  @action editEmail = async (email: string) => {
    this.email = email;
  };

  @action editTelephone = async (telephone: string) => {
    this.telephone = telephone;
  };

  @action editWechat = async (wechat: string) => {
    this.wechat = wechat;
  };

  @action editQQ = async (qq: string) => {
    this.qq = qq;
  };

  @action editStatus = async (status: number) => {
    console.log('back', status);
    this.status = status;
  };
}
