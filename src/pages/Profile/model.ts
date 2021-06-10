import { action, observable } from 'mobx';
import type { BaseStore } from '@/store';
import { getProfileInfo } from '@/services/profile';
import type { ProfileParamsType } from '@/services/profile';
import type { ProfileType, InfoType } from './type';
import { message } from 'antd';

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
      campus: '玉泉',
      dormitory: '未获取',
      wechat: '',
      qq: '未获取',
      birthday: '2000-10-27',
      gender: '',
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

  @action fetchData = async () => {
    const params: ProfileParamsType = { id: this.baseStore.id };
    const response = await getProfileInfo(params);
    if (response) {
      if (response.basic_person) {
        this.setProfileInfo(response.basic_person);
      } else {
        message.info('Fetch Incorrect Data');
        console.error('Fetch Incorrect Data');
      }
    } else {
      message.info('Fetch Profile Data Error');
      console.error('Fetch Profile Data Error');
    }
  };

  @action setProfileInfo = async (info: InfoType) => {
    this.setName(info.name);
    this.setId(this.baseStore.id);
    this.setDepartment(info.major);
    this.setBirthday(info.birthday);
    this.setBloodType(info.blood_type);
    this.setCampus(info.campus);
    this.setGender(info.gender);
    this.setNation(info.nation);
    this.setHometown(info.hometown);
    this.setPolitics(info.politics);
    this.setDomitory(info.dormitory);
    this.editEmail(info.email);
    this.editTelephone(info.phone);
    this.editWechat(info.wechat);
    this.editQQ(info.qq);
    this.editStatus(info.status);
  };

  @action setName(name: string) {
    this.profileInfo.basic_person.name = name;
  }

  @action setId(id: string) {
    this.profileInfo.basic_person.id = id;
    // console.error('set id in profile deprecated');
  }

  @action setDepartment(major: string) {
    this.profileInfo.basic_person.major = major;
  }

  @action setBirthday(birthday: string) {
    this.profileInfo.basic_person.birthday = birthday;
  }

  @action setBloodType(blood_type: string) {
    this.profileInfo.basic_person.blood_type = blood_type;
  }

  @action setCampus(campus: string) {
    this.profileInfo.basic_person.campus = campus;
  }

  @action setGender(gender: string) {
    this.profileInfo.basic_person.gender = gender;
  }

  @action setHometown(hometown: string) {
    this.profileInfo.basic_person.hometown = hometown;
  }

  @action setNation(nation: string) {
    this.profileInfo.basic_person.nation = nation;
  }

  @action setPolitics(politics: string) {
    this.profileInfo.basic_person.politics = politics;
  }

  @action setDomitory(dorm: string) {
    this.profileInfo.basic_person.dormitory = dorm;
  }

  @action editEmail = async (email: string) => {
    this.profileInfo.basic_person.email = email;
  };

  @action editTelephone = async (telephone: string) => {
    this.profileInfo.basic_person.phone = telephone;
  };

  @action editWechat = async (wechat: string) => {
    this.profileInfo.basic_person.wechat = wechat;
  };

  @action editQQ = async (qq: string) => {
    this.profileInfo.basic_person.qq = qq;
  };

  @action editStatus = async (status: number) => {
    this.profileInfo.basic_person.status = status;
  };
}
