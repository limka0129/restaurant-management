import request from './request'
import qs from 'qs'

// 输入顾客数量，给迎宾员推荐顾客可以在哪个餐桌就座
export function getTableRecommend(customerNum) {
  return request.get('/api/findtable', {
    params: {
      person: +customerNum
    }
  })
}

// 迎宾员引导顾客在tableID餐桌坐下
export function sit(tableId) {
  return request.post('/api/sit', qs.stringify({ table_id: tableId }))
}
