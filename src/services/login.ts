import request from '@/utils/request';
import type { RoleType } from '@/pages/Login/model';

export type LoginParamsType = {
  aid: string;
  password: string;
  type: RoleType;
  loginType: string;
  mobile?: string;
  captcha?: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request(`/api/login`, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
