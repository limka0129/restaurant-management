// 和查询菜品相关的接口

import request from './request'

export function getMenu() {
  return request.get('/api/menu')
}

export function getMenuByDishId(id) {
  return request.get('/api/getByDishId',{
    params: {
      dishId: +id
    }
  })
}

export function getMenuByCategory(id) {
  return request.post('/api/getBycategory',{
    category: +id
  })
}


