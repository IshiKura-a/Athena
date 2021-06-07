import request from '@/utils/request';

export type ProfileParamsType = {
  id: string;
};

export async function getProfileInfo(params: ProfileParamsType) {
  return request(`/api/studenttemp?id=${params.id}`, {
    method: 'GET',
  });
}

export async function getProfileInfoNoToken() {
  return request(`/api/student0`);
}
