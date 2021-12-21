import request from '@/HeyCafe/api/request'
import qs from 'qs'

export function getDishesDone() {
  return request.post('/api/findDishesDone')
}

export function payOrder(orderId) {
  return request.post('/api/payOrder', qs.stringify({ order_id: orderId }))
}

// 根据订单信息上齐该订单的所有菜品
export function serveAllDishes(orderId) {
  return request.post('/api/serveDish', qs.stringify({ order_id: orderId }))
}
