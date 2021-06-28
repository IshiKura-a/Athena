import request from '@/utils/request';

export type ProfileParamsType = {
  id: string;
};

export async function getProfileInfo(params: ProfileParamsType) {
  return request(`/api/student/`, {
    method: 'GET',
    params,
  });
}

export async function getProfileInfoNoToken() {
  return request(`/api/student0`);
}

export default { getProfileInfo };
