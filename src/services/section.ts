import request from '@/utils/request';
import type { RoleType } from '@/pages/Login/model';

export type paramsSignInList = {
  stuID: string;
  role: RoleType;
  sectionID: string;
};

export type paramsSignInCreate = {
  sectionID: string;
  description: string;
  expireAt: string;
};

export type paramsSignInUpdate = {
  stuID: string;
  id: string;
};

export async function listSignIn(params: paramsSignInList) {
  return request(`/api/signIn/list1`, {
    method: 'GET',
    data: params,
  });
}

export async function createSignIn(params: paramsSignInCreate) {
  return request(`/api/signIn/create`, {
    method: 'POST',
    data: params,
  });
}

export async function updateSignIn(params: paramsSignInUpdate) {
  return request(`/api/signIn/update`, {
    method: 'POST',
    data: params,
  });
}
