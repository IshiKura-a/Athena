import type { Record } from '@/pages/Section/type';
import request from 'umi-request';

export type paramsHwList = {
  section_id: string;
};

export async function listHw(params: paramsHwList) {
  return request(`/api/homework/list`, {
    method: 'GET',
    params,
  });
}

export type paramsHwHandIn = {
  id: string;
  record: Record;
};

export async function handInHw(params: paramsHwHandIn) {
  return request(`/api/homework/hand_in`, {
    method: 'POST',
    data: params,
  });
}

export type paramsCheckHW = {
  id: string;
  score: number;
};

export async function checkHW(params: paramsCheckHW) {
  return request(`/api/homework/mark`, {
    method: 'POST',
    data: params,
  });
}

export type paramsCreateHW = {
  section_id: string;
  description: string;
  expire_at: string;
};

export async function createHW(params: paramsCreateHW) {
  return request(`/api/homework/create`, {
    method: 'POST',
    data: params,
  });
}
