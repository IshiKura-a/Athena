import request from '@/utils/request';

export async function createTodo(params: any) {
  return request.post(`/api/todo/create`, {
    data: params,
  });
}

export async function listTodo(params: { id: string }) {
  return request(`api/todo/`, {
    method: 'GET',
    params,
  });
}

export async function deleteTodo(params: { _id: string }) {
  return request.post(`/api/todo/delete`, {
    data: params,
  });
}

export async function updateTodo(params: any) {
  return request.post(`/api/todo/update`, {
    data: params,
  });
}

export default { createTodo, listTodo, deleteTodo, updateTodo };
