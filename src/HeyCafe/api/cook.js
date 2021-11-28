import request from '@/HeyCafe/api/request'

export function getDishesUndone() {
  return request.post('/api/findDishesTodo')
}

