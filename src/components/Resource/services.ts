import request from '@/utils/request';

export async function getResourceList(params: { section_id: string }) {
  return request(`/api/resource`, {
    method: 'GET',
    params,
  });
}

export async function getResource(params: { id: string }) {
  return request(`/api/resource/download`, {
    method: 'GET',
    params,
  });
}

export async function uploadResource(formData: FormData) {
  return request(`/api/resource/create`, {
    method: 'POST',
    requestType: 'form',
    data: formData,
  });
}

export default { getResourceList, getResource, uploadResource };
