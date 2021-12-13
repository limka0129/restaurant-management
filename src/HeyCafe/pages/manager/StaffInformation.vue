<template>
  <div>
    <div v-for="staff of staffs" :key="staff.staffId" class="staff">
      <a-avatar :size="64" icon="user" />
      <div>{{ staff.name }}({{ staff.userName }})</div>
      <div>
        <span>时薪：</span>
        <a-input style="width: 85px" size="small" prefix="￥" v-model="staff.salary" @change="staff.showSalaryEdit = true" />
        <a-button v-show="staff.showSalaryEdit" shape="circle" icon="edit" size="small" />
      </div>
      <div>电话号码：{{ staff.phoneNumber }}</div>
      <div>职务：{{ staff.role }}</div>
    </div>
  </div>
</template>

<script>
import { getStaffInformation } from '@/HeyCafe/api/manager'

export default {
  name: 'StaffInformation',
  data() {
    return {
      staffs: []
    }
  },
  mounted() {
    getStaffInformation().then(res => {
      if (+res?.err === 0) {
        this.staffs = res.data
      } else {
        throw new Error('findAllStaff接口返回err不为0')
      }
    }).catch(err => {
      console.error(err)
      this.$message.error('查询员工信息失败！')
    })
  }
}
</script>

<style scoped lang="less">
.staff {
  margin: 10px 20px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  div {
    margin: 2px 0;
  }
}

</style>
