import request from '@/utils/request';

export type ProfileParamsType = {
  id: string;
  phone?: string;
  wechat?: string;
  email?: string;
  qq?: string;
};

export async function getProfileInfo(params: { id: string }) {
  return request(`/api/profile/`, {
    method: 'GET',
  });
}

export async function getProfileInfoNoToken() {
  return request(`/api/student0`);
}

export async function updateProfileInfo(params: ProfileParamsType) {
  return request(`/api/profile/update`, {
    method: 'POST',
    data: params,
  });
}

export default { getProfileInfo };
