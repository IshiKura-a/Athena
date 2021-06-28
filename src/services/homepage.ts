import request from '@/utils/request';

export async function fetchLesson() {
  return request(`/api/section/all`, {
    method: 'GET',
  });
}

export async function queryNotification() {
  return request(`/api/home`);
}
