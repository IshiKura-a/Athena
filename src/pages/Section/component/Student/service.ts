import request from '@/utils/request';
import type { Record } from '@/pages/Section/[sectionID]/type';

export type paramsSignInUpdate = {
  id: string;
};

export type paramsHwHandIn = {
  id: string;
  record: Record;
};

export async function updateSignIn(params: paramsSignInUpdate) {
  return request(`/api/sign_in`, {
    method: 'POST',
    data: params,
  });
}

export async function handInHw(params: paramsHwHandIn) {
  return request(`/api/homework/hand_in`, {
    method: 'POST',
    data: params,
  });
}
