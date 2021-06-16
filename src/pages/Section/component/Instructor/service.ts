import request from '@/utils/request';

export async function instructorInfo(id: string) {
  return request(`/api/instructor`, {
    method: 'GET',
    params: { id },
  });
}

export async function createHW(id: string) {
  return request(`/api/sign_in/list`, {
    method: 'GET',
    params: { id },
  });
}
