import request from './request'

export function sitForMeal(customerNum) {
  return request.get('/api/findtable',{
    params: {
      person: +customerNum
    }
  })
}
