import { action, observable } from 'mobx';
import { accountLogin } from '@/services/login';
import type { LoginParamsType } from '@/services/login';
import { getPageQuery, setCookie } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';
import { setAuthority } from '@/utils/authority';
import { stringify } from 'querystring';
import type { BaseStore } from '@/store';
import { cloneDeep } from 'lodash';
import type { ProfileParamsType } from '@/services/profile';
import { getProfileInfo } from '@/services/profile';

export type StateType = {
  message?: 'ok' | 'error';
  loginType?: 'account' | 'mobile';
};

export enum RoleType {
  student = 'student',
  instructor = 'instructor',
}

export function isStudent(type: string) {
  return type === RoleType.student;
}

export default class LoginStore {
  @observable userLogin: StateType = { loginType: 'account' };
  @observable inSubmitting: boolean = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action login = async (payload: LoginParamsType) => {
    this.inSubmitting = true;
    const response = await accountLogin(payload);
    setCookie('JWT-Token', response.token);

    // Login successfully
    if (!response.status || `${response.status}`.indexOf('2') === 0) {
      const profile = await getProfileInfo();
      if (!profile.status || `${profile.status}`.indexOf('2') === 0) {
        this.baseStore.setName(profile.basic_person.name);
      } else {
        this.baseStore.setName('');
      }

      this.setUserLogin({
        message: 'ok',
        loginType: 'account',
      });
      setAuthority(payload.type);
      this.baseStore.setId(payload.aid);
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      message.success('🎉 🎉 🎉  登录成功！');
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (window.routerBase !== '/') {
            redirect = redirect.replace(window.routerBase, '/');
          }
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }
      history.replace(redirect || '/');
    } else {
      this.setUserLogin({
        message: 'error',
        loginType: 'account',
      });
    }
    this.inSubmitting = false;
  };

  @action logout = async () => {
    const { redirect } = getPageQuery();
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
    }
  };

  @action setLoginType(loginType: any) {
    this.userLogin = cloneDeep({
      ...this.userLogin,
      loginType,
    });
  }

  @action setSubmitting(inSubmitting: boolean) {
    this.inSubmitting = inSubmitting;
  }

  @action setUserLogin = (userLogin: StateType) => {
    this.userLogin = cloneDeep(userLogin);
  };
}
