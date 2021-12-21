<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="card-content-wrapper">
        <div>
          <span>昵称：</span>
          <a-input style="width: 95px" size="small" v-model="profile.name"/>
        </div>
        <div>
          <span>性别：</span>
          <a-radio-group v-model="profile.gender">
            <a-radio :value="0">
              男
            </a-radio>
            <a-radio :value="1">
              女
            </a-radio>
          </a-radio-group>
        </div>
        <div>
          <span>年龄：</span>
          <a-input style="width: 45px" size="small" v-model="profile.age"/>
        </div>
        <div>
          <span>手机号码：</span>
          <a-input style="width: 120px" size="small" v-model="profile.phoneNumber"/>
        </div>
        <div>
          <span>职务：</span>
          {{ profile.role || '暂无职位，请联系经理分配' }}
        </div>
        <div>
          <span>时薪：</span>
          {{ profile.salary || '暂无工资，请联系经理分配' }}
        </div>
        <div>
          <span>入职时间：</span>
          {{ profile.onboardDate || '未知' }}
        </div>
        <a-button @click="handleEditProfile" class="button" type="primary">修改</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import {getProfile, editProfile} from '@/HeyCafe/api/main'
import {pick} from "lodash";

export default {
  data() {
    return {
      profile: {}
    }
  },
  mounted() {
    getProfile().then(res => {
      this.profile = res.data
    }).catch(err => {
      console.error(err)
      this.$message.error('个人信息获取失败！')
    })
  },
  methods: {
    handleEditProfile() {
      const staffProfileObj = pick(this.profile, ['staffId', 'name', 'gender', 'age', 'phoneNumber'])
      editProfile(staffProfileObj).then(res => {
        this.$message.success('个人信息修改成功！')
      }).catch(err => {
        console.error(err)
        this.$message.error('个人信息修改失败！')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-index-wide {
  display: flex;
  justify-content: center;
}

.card-content-wrapper {
  margin: 0 8vw;
  display: flex;
  flex-direction: column;

  div {
    margin: 4px 0;

    span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .button {
    align-self: center;
    width: 100px;
    margin-top: 50px;
  }
}
</style>
