import { action, observable } from 'mobx';
import type { BaseStore } from '@/store';
import { getProfileInfo, updateProfileInfo } from '@/services/profile';
import type { ProfileType } from './type';
import { message } from 'antd';
import { cloneDeep } from 'lodash';

export default class ProfileStore {
  @observable profileInfo: ProfileType = {
    basic_person: {
      id: '未获取',
      name: '未获取',
      phone: '未获取',
      major: 'cs',
      email: '未获取',
      politics: '未获取',
      hometown: '未获取',
      nation: '未获取',
      blood_type: 'O',
      address: '未获取',
      wechat: '',
      qq: '未获取',
      birthday: '2000-10-27',
      gender: '',
      status: 2, // in {0, 1, 2}
    },
    takes: [
      {
        course_id: '',
        section_id: '',
        grade: 0,
      },
    ],
  };
  @observable id: string = '';

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action fetchData = async () => {
    // const params: ProfileParamsType = { id: this.baseStore.id };
    const response: ProfileType = await getProfileInfo({ id: this.baseStore.id });
    if (response) {
      if (response.basic_person) {
        this.setProfileInfo(response);
        console.log(response.basic_person);
      } else {
        message.info('Fetch Incorrect Data');
        console.error('Fetch Incorrect Data');
      }
    } else {
      message.info('Fetch Profile Data Error');
      console.error('Fetch Profile Data Error');
    }
  };

  @action setProfileInfo = (info: ProfileType) => {
    this.profileInfo = cloneDeep(info);
  };

  @action editEmail = async (email: string) => {
    this.profileInfo.basic_person.email = email;
    const response = await updateProfileInfo({ id: this.baseStore.getId(), email });
    console.log('update', response);
  };

  @action editTelephone = async (telephone: string) => {
    this.profileInfo.basic_person.phone = telephone;
    const response = await updateProfileInfo({ id: this.baseStore.getId(), phone: telephone });
    console.log('update', response);
  };

  @action editWechat = async (wechat: string) => {
    this.profileInfo.basic_person.wechat = wechat;
    const response = await updateProfileInfo({ id: this.baseStore.getId(), wechat });
    console.log('update', response);
  };

  @action editQQ = async (qq: string) => {
    this.profileInfo.basic_person.qq = qq;
    const response = await updateProfileInfo({ id: this.baseStore.getId(), qq });
    console.log('update', response);
  };

  @action editStatus = async (status: number) => {
    this.profileInfo.basic_person.status = status;
    const response = await updateProfileInfo({ id: this.baseStore.getId(), status });
    console.log('update', response);
  };
}
