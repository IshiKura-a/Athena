import request from '@/utils/request';

export type paramsSignInCreate = {
  section_id: string;
  description: string;
  expire_at: string;
};

export type paramsSignInList = {
  section_id: string;
};

export async function listSignIn(params: paramsSignInList) {
  return request(`/api/sign_in/list`, {
    method: 'GET',
    params,
  });
}

export async function createSignIn(params: paramsSignInCreate) {
  return request(`/api/sign_in/create`, {
    method: 'POST',
    data: params,
  });
}

export type paramsSignInUpdate = {
  id: string;
};

export async function updateSignIn(params: paramsSignInUpdate) {
  return request(`/api/sign_in`, {
    method: 'POST',
    data: params,
  });
}
