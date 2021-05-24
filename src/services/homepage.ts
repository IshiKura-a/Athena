import request from '@/utils/request';

export type additionToDo = {
  start_time?: string;
  end_time?: string;
  description?: string;
};

export type fetchLessonParams = {
  id?: string;
};

export type addToDoParams = {
  id: string;
  title: string;
  finished: boolean;
  addition: null;
};

export type fetchToDoParams = {
  id: string;
};

export type editToDoParams = {
  _id: number;
  title?: string;
  finished?: boolean;
  addition: additionToDo;
};

export type deleteToDoParams = {
  _id: number;
};

export async function fetchLesson(params: fetchLessonParams, token: string | null) {
  return request(`/api/section/all`, {
    method: 'GET',
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addToDo(params: addToDoParams, token: string | null) {
  return request(`/api/todo/create`, {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function editToDo(params: editToDoParams, token: string | null) {
  return request(`/api/todo/update`, {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteToDo(params: deleteToDoParams, token: string | null) {
  return request(`/api/todo/delete`, {
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchToDo(params: fetchToDoParams, token: string | null) {
  return request(`/api/todo`, {
    method: 'GET',
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function queryNotification() {
  return request(`/api/home`);
}
