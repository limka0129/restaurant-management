import request from '@/HeyCafe/api/request'
// import qs from 'qs'

export function getStaffInformation() {
  return request.post('/api/findAllStaff')
}
