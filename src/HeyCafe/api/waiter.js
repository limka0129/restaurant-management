import request from '@/HeyCafe/api/request'
import qs from 'qs'

export function getDishesDone() {
  return request.post('/api/findDishesDone')
}

export function payOrder(orderId) {
  return request.post('/api/payOrder', qs.stringify({ order_id: orderId }))
}
