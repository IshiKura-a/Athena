import request from '@/utils/request';

export async function queryNotification() {
  console.log('exec at queryNotification');
  return request('/api/home');
}
