import request from '@/utils/request';

export type paramsSignInList = {
  section_id: string;
};

export type paramsHwList = {
  section_id: string;
};

export async function listSignIn(params: paramsSignInList) {
  return request(`/api/sign_in/list`, {
    method: 'GET',
    params,
  });
}

export async function listHw(params: paramsHwList) {
  return request(`/api/homework/list`, {
    method: 'GET',
    params,
  });
}
