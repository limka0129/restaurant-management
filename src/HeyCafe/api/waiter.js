import request from '@/HeyCafe/api/request'

export function getDishesDone() {
  return request.post('/api/findDishesDone')
}
