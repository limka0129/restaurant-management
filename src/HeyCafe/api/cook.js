import request from '@/HeyCafe/api/request'
import qs from 'qs'

export function getDishesUndone() {
  return request.post('/api/findDishesTodo')
}

// 出餐
export function finishDishes(dishesArray) {
  return request.post('/api/finishDishes',qs.stringify({
    items: JSON.stringify(dishesArray)
  }))
}
