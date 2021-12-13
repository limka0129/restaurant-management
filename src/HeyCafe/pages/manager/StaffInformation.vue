<template>
  <div>
    <div v-for="staff of staffs" :key="staff.staffId" class="staff">
      <a-avatar :size="64" icon="user"/>
      <div>{{ staff.name }}({{ staff.userName }})</div>
      <div>
        <span>时薪：</span>
        <a-input style="width: 85px" size="small" prefix="￥" v-model="staff.salary"
                 @keyup.enter.native="handleSalaryEdit(staff.staffId,staff.salary)"/>
        <a-button @click="handleSalaryEdit(staff.staffId,staff.salary)" shape="circle" icon="edit" size="small"/>
      </div>
      <div>电话号码：{{ staff.phoneNumber }}</div>
      <div>
        <span>职务：</span>
        <a-dropdown :trigger="['click']">
          <a-menu slot="overlay" @click="handleMenuClick($event,staff.role,staff.staffId)">
            <a-menu-item key="host">host</a-menu-item>
            <a-menu-item key="waiter">waiter</a-menu-item>
            <a-menu-item key="cook">cook</a-menu-item>
            <a-menu-item key="busboy">busboy</a-menu-item>
            <a-menu-item key="manager">manager</a-menu-item>
          </a-menu>
          <a-button size="small" style="margin-left: 8px">{{ staff.role }}
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </div>
      <a-popconfirm
          placement="right"
          title="确定解雇该员工吗？"
          ok-text="赶紧走人"
          cancel-text="手下留情"
          @confirm="handleDismissStaff(staff.staffId)"
      >
        <a-button type="danger" size="small">
          解雇
        </a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import {getStaffInformation, adjustSalary, adjustRole, dismissStaff} from '@/HeyCafe/api/manager'

export default {
  name: 'StaffInformation',
  data() {
    return {
      staffs: []
    }
  },
  mounted() {
    this.updateStaffInformation()
  },
  methods: {
    handleSalaryEdit(staffId, newSalary) {
      adjustSalary(staffId, newSalary).then(res => {
        if (+res?.err === 0) {
          this.$message.success('工资调整成功！')
        } else {
          throw new Error('adjustSalary接口返回数据非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('工资调整失败！')
      })
    },
    handleMenuClick(e, currentRole, staffId) {
      if (e.key !== currentRole) {
        adjustRole(staffId, e.key).then(res => {
          if (+res?.err === 0) {
            this.$message.success('职位调整成功！')
            for (let staff of this.staffs) {
              staff.staffId === staffId && (staff.role = e.key)
            }
          } else {
            throw new Error('adjustRole接口返回数据非0')
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('职位调整失败！')
        })
      }
    },
    handleDismissStaff(staffId) {
      dismissStaff(staffId).then(res => {
        if (+res?.err === 0) {
          this.$message.success('员工解雇成功！')
          this.staffs = this.staffs.filter(staff => staff.staffId !== staffId)
        } else {
          throw new Error('dismissStaff接口返回数据非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('员工解雇失败！')
      })
    },
    updateStaffInformation() {
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
