import request from '@/utils/request';

export type fetchLessonParams = {
  id?: string;
};

export type deleteToDoParams = {
  _id: number;
};

export async function fetchLesson(params: fetchLessonParams) {
  return request(`/api/section/all`, {
    method: 'GET',
    params,
  });
}

export async function queryNotification() {
  return request(`/api/home`);
}
