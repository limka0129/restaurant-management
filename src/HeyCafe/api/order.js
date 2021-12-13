// 和订单相关的接口

import request from './request'
import qs from 'qs'

export function getOrderDetailById(orderId) {
  return request.post('/api/findOrderDetails',{
    orderId: +orderId
  })
}


export function getOrderDetailByCusId(cusId) {
  return request.post('/api/findOrderByCusId',{
    cusId: +cusId
  })
}

export function createOrder(cusId,tableId,dishItemArray) {
  return request.post('/api/createOrder',qs.stringify({
    cus_id: +cusId,
    table_id: +tableId,
    items: JSON.stringify(dishItemArray)
  }))
}

export function cancelOrder(orderId) {
  return request.post('/api/cancelOrder',{
    orderId: +orderId
  })
}

