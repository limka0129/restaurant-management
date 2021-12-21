<template>
  <div class="container">
    <a-transfer
      class="todo-dishes"
      :data-source="origin"
      :titles="[$t('hc.todoDishes'), $t('hc.doneDishes')]"
      :target-keys="targetKeys"
      :render="item => item.title"
      :list-style="{
        width: '250px',
        height: '500px'
      }"
      :locale="{ itemUnit: '份', itemsUnit: '份', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }"
      :operations="['出餐','']"
      @change="handleChange"
    />
  </div>
</template>


<script>
import { getDishesUndone, finishDishes } from '@/HeyCafe/api/cook'
import { getDishesDone } from '@/HeyCafe/api/waiter'
import {registerCallback} from "@/HeyCafe/api/websocket";

export default {
  name: 'TodoDishes',
  data() {
    return {
      origin: [], // 数据源，同时包括已完成和未完成的菜
      targetKeys: [] // 已完成的菜的key
    }
  },
  methods: {
    handleChange(nextTargetKeys, direction, movedKeys) {
      let dishesToBeFinished = this.origin.filter(item => movedKeys.includes(item.key))
      finishDishes(dishesToBeFinished).then(res => {
        if (+res?.err === 0) {
          this.$message.success('出餐成功！')
          this.targetKeys = nextTargetKeys
        } else {
          throw new Error('finishDished接口返回数据非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('出餐失败！')
      })
    },
    updateDishesUndone() {
      getDishesUndone().then(res => {
        for (let item of res.data) {
          this.origin.push({
            key: this.origin.length + '',
            title: item.name + ' * ' + item.count,
            orderId: item.orderId,
            dishId: item.dishId
          })
        }
      })
    }
  },
  mounted() {
    registerCallback('cook',(data)=>{
      if(localStorage.getItem('CurrentUserRole')==='cook') {
        this.$message.warning(`厨师你好，顾客又下新的订单啦`)
      }
      this.updateDishesUndone()
    })
    this.updateDishesUndone()
    getDishesDone().then(res => {
      for (let item of res.data) {
        this.origin.push({
          key: this.origin.length + '',
          title: item.name + ' * ' + item.count,
          orderId: item.orderId,
          dishId: item.dishId
        })
        this.targetKeys.push(`${this.origin.length - 1}`)
      }
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.todo-dishes {
  min-width: 590px;
}

.todo-dishes >>> .ant-btn-icon-only {
  display: none !important;
}
</style>
