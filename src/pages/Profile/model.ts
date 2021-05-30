import { action, observable } from 'mobx';
import { BaseStore } from '@/store';
import { getProfileInfoNoToken } from '@/services/profile';
import type { ProfileParamsType } from '@/services/profile';
import type { ProfileType } from './type';

export default class ProfileStore {
  @observable profileInfo: ProfileType = {
    basic_person: {
      id: '3180100000',
      name: '张天然',
      phone: '15336520000',
      major: 'cs',
      email: '3180100000@zju.edu.cn',
      politics: '',
      hometown: '',
      nation: '',
      blood_type: 'O',
      campus: '玉泉',
      dormitory: '',
      wechat: '',
      qq: '',
      birthday: '2000-10-27',
      gender: '女',
      status: 0, // in {0, 1, 2}
    },
    takes: [
      {
        course_id: '',
        section_id: '',
        grade: 0,
      },
    ],
  };

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action fetchData = async (input: ProfileParamsType) => {
    const response = await getProfileInfoNoToken(input);
    console.log('test', response.basic_person);
    const { id, name } = response.basic_person;
    this.setId(id);
    this.setName(name);
  };

  @action setName(name: string) {
    this.profileInfo.basic_person.name = name;
  }

  @action setId(id: string) {
    this.profileInfo.basic_person.id = id;
  }

  @action setDepartment(department: string) {
    this.profileInfo.basic_person.id = department;
  }

  @action editEmail = async (email: string) => {
    this.profileInfo.basic_person.email = email;
  };

  @action editTelephone = async (telephone: string) => {
    this.profileInfo.basic_person.email = telephone;
  };

  @action editWechat = async (wechat: string) => {
    this.profileInfo.basic_person.wechat = wechat;
  };

  @action editQQ = async (qq: string) => {
    this.profileInfo.basic_person.qq = qq;
  };

  @action editStatus = async (status: number) => {
    // console.log('back', status);
    this.profileInfo.basic_person.status = status;
  };

  @action getProfileInfo = async () => {};
}
