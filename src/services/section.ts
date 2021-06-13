import request from '@/utils/request';
import type { RoleType } from '@/pages/Login/model';
import type { Record } from '@/pages/Section/[sectionID]/model';

export type paramsSignInList = {
  stuID: string;
  sectionID: string;
  role: RoleType;
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

export type paramsHwList = {
  stuID: string;
  role: RoleType;
  sectionID: string;
};

export type paramsHwHandIn = {
  id: string;
  record: Record;
};

export async function listSignIn(params: paramsSignInList) {
  return request(`/api/signIn/list`, {
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

export async function listHw(params: paramsHwList) {
  return request(`/api/homework/list`, {
    method: 'GET',
    params,
  });
}

export async function handInHw(params: paramsHwHandIn) {
  return request(`/api/homework/list`, {
    method: 'POST',
    data: params,
  });
}
