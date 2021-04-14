import request from '@/utils/request';

export type LoginParamsType = {
  aid: string;
  password: string;
  type: string;
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
