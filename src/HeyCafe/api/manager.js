import request from '@/HeyCafe/api/request'
import qs from 'qs'

export function getStaffInformation() {
  return request.post('/api/findAllStaff')
}

export function adjustSalary(staffId, newSalary) {
  return request.post('/api/adjustSalary', qs.stringify({ staffId, newSalary }))
}

export function adjustRole(staffId, newRole) {
  return request.post('/api/adjustRole', qs.stringify({ staffId, newRole }))
}

export function dismissStaff(staffId) {
  return request.post('/api/dismiss', qs.stringify({ staffId }))
}