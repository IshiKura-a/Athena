import request from '@/utils/request';

export async function getTopic(params: { section_id: string }) {
  return request(`/api/topic`, {
    method: 'GET',
    params,
  });
}

export async function createTopic(params: {
  section_id: string;
  title: string;
  description: string;
}) {
  return request.post(`/api/topic/create`, {
    data: params,
  });
}

export async function getComment(params: { topic_id: string }) {
  return request(`/api/comment`, {
    method: 'GET',
    params,
  });
}

export async function createComment(params: {
  topic_id: string;
  user_id?: string;
  content: string;
}) {
  return request.post(`/api/comment/create`, {
    data: params,
  });
}

export default { getTopic, createTopic, getComment, createComment };
