import request from '@/utils/request';
import type { RoleType } from '@/pages/Login/model';
import type { Record } from '@/pages/Section/[sectionID]/type';

export type paramsSignInList = {
  section_id: string;
};

export type paramsSignInCreate = {
  section_id: string;
  description: string;
  expire_at: string;
};

export type paramsSignInUpdate = {
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

export async function updateSignIn(params: paramsSignInUpdate) {
  return request(`/api/sign_in`, {
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
