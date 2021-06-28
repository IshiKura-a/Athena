import request from '@/utils/request';

export async function listNotify(params: { id: string }) {
  return request(`api/notification/`, {
    method: 'GET',
    params,
  });
}

export default { listNotify };
