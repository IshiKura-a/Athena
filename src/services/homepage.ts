import request from '@/utils/request';

export type fetchLessonParams = {
  token: string | null;
};

export type addToDoParams = {
  token: string | null;
  title: string;
};

export type fetchToDoParams = {
  token: string | null;
};

export type finishToDoParams = {
  token: string | null;
  id: number;
};

export type editToDoParams = {
  token: string | null;
  id: number;
  title?: string;
  start_time?: string;
  end_time?: string;
  description?: string;
};

export type deleteToDoParams = {
  token: string | null;
  id: number;
};

export async function fetchLesson(params: fetchLessonParams) {
  return request(`/api/home/lessonFetch`, {
    method: 'GET',
    data: params,
  });
}

export async function addToDo(params: addToDoParams) {
  return request(`/api/home/todoadd`, {
    method: 'POST',
    data: params,
  });
}

export async function finishToDo(params: finishToDoParams) {
  return request(`/api/home/todofinish`, {
    method: 'POST',
    data: params,
  });
}

export async function editToDo(params: editToDoParams) {
  return request(`/api/home/todoedit`, {
    method: 'POST',
    data: params,
  });
}

export async function deleteToDo(params: deleteToDoParams) {
  return request(`/api/home/tododelete`, {
    method: 'POST',
    data: params,
  });
}

export async function fetchToDo(params: fetchToDoParams) {
  return request(`/api/home/todofetch`, {
    method: 'GET',
    data: params,
  });
}

export async function queryNotification() {
  return request(`/api/home`);
}
