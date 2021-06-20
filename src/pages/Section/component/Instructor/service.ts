import request from '@/utils/request';

export type paramsSignInCreate = {
  section_id: string;
  description: string;
  expire_at: string;
};

export type paramsCheckHW = {
  id: string;
  score: number;
};

export type paramsCreateHW = {
  section_id: string;
  description: string;
  expire_at: string;
};

export async function instructorInfo(id: string) {
  return request(`/api/instructor`, {
    method: 'GET',
    params: { id },
  });
}

export async function createHW(params: paramsCreateHW) {
  return request(`/api/homework/create`, {
    method: 'POST',
    data: params,
  });
}

export async function checkHW(params: paramsCheckHW) {
  return request(`/api/homework/mark`, {
    method: 'POST',
    data: params,
  });
}

export async function createSignIn(params: paramsSignInCreate) {
  return request(`/api/sign_in/create`, {
    method: 'POST',
    data: params,
  });
}
