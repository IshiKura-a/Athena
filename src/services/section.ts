import request from '@/utils/request';
import type { RoleType } from '@/pages/Login/model';

export type signInList = {
  stuID: number;
  role: RoleType;
  sectionID: string;
};

export type signInCreate = {
  sectionID: string;
  description: string;
  expireAt: string;
};

export type signInUpdate = {
  stuID: number;
  id: number;
};

export async function listSignIn(params: signInList) {
  return request(`/api/section/list`, {
    method: 'GET',
    params,
  });
}

export async function createSignIn(params: signInCreate) {
  return request(`/api/section/create`, {
    method: 'POST',
    params,
  });
}

export async function updateSignIn(params: signInUpdate) {
  return request(`/api/section/update`, {
    method: 'POST',
    params,
  });
}
