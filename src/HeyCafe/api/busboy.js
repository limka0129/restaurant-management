import request from '@/HeyCafe/api/request'
import qs from 'qs'

export function cleanTable(tableId) {
  return request.post('/api/cleanTable', qs.stringify({ table_id: tableId }))
}
