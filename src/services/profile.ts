import request from '@/utils/request';

export type ProfileParamsType = {
  id: string;
};

export async function getProfileInfo(params: ProfileParamsType) {
  console.log('id', params.id);
  return request(`/api/student?id=${params.id}`, {
    method: 'GET',
    data: params,
  });
}

export async function getProfileInfoNoToken() {
  return request(`/api/student0`);
}
