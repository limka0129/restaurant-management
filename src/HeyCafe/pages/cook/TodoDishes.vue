<template>
  <div >
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
import { getDishesUndone } from '@/HeyCafe/api/cook'
import { getDishesDone } from '@/HeyCafe/api/waiter'

export default {
  name: 'TodoDishes',
  data() {
    return {
      origin: [], // 数据源，同时包括已完成和未完成的菜
      targetKeys: [], // 已完成的菜的key
    };
  },
  methods: {
    handleChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
    },
  },
  mounted() {
    getDishesUndone().then(res=>{
      for(let item of res.data) {
        this.origin.push({
          key: this.origin.length + '',
          title: item.name + ' * ' + item.count,
        })
      }
    })
    getDishesDone().then(res=>{
      for(let item of res.data) {
        this.origin.push({
          key: this.origin.length + '',
          title: item.name + ' * ' + item.count,
        })
        this.targetKeys.push(`${this.origin.length - 1}`)
      }
    })
  }
};
</script>

<style scoped>
.todo-dishes {
  min-width: 590px;
}

.todo-dishes >>> .ant-btn-icon-only {
  display: none !important;
}
</style>
