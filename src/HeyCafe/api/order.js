// 和订单相关的接口

import request from './request'

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
  return request.post('/api/createOrder',{
    cus_id: +cusId,
    table_id: +tableId,
    items: dishItemArray
  })
}

export function cancelOrder(orderId) {
  return request.post('/api/cancelOrder',{
    orderId: +orderId
  })
}

