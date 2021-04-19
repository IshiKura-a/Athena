import { action, observable } from 'mobx';
import { accountLogin } from '@/services/login';
import type { LoginParamsType } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { history } from '@@/core/history';
import { setAuthority } from '@/utils/authority';
import { stringify } from 'querystring';
import { BaseStore } from '@/store';
import { cloneDeep } from 'lodash';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export default class LoginStore {
  @observable userLogin: StateType = { type: 'account' };
  @observable inSubmitting: boolean = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action login = async (payload: LoginParamsType) => {
    this.inSubmitting = true;
    const response = await accountLogin(payload);
    setAuthority(response.currentAuthority);
    this.setUserLogin({
      status: response.status,
      type: response.type,
      currentAuthority: response.currentAuthority,
    });
    // Login successfully
    if (response.status === 'ok') {
      this.baseStore.setToken(response.token);
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
    }
    this.inSubmitting = false;
  };

  @action logout = async () => {
    const { redirect } = getPageQuery();
    this.baseStore.setToken('');
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

  @action setType(type: string) {
    this.userLogin = cloneDeep({
      ...this.userLogin,
      type,
    });
  }

  @action setSubmitting(inSubmitting: boolean) {
    this.inSubmitting = inSubmitting;
  }

  @action setUserLogin = (userLogin: StateType) => {
    this.userLogin = cloneDeep(userLogin);
  };
}