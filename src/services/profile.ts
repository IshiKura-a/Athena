import request from '@/utils/request';

export type ProfileParamsType = {
  id?: string;
};

export async function getProfileInfo() {
  return request(`/api/profile`, {
    method: 'GET',
  });
}

export async function getProfileInfoNoToken() {
  return request(`/api/student0`);
}

export default { getProfileInfo };
