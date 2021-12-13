<template>
  <div>
    <div v-for="(category,index) of categoriesMap">
      <div class="category-title">{{ category }}</div>
      <div class="dish-wrap" v-for="item of dishes.filter(o=>o.category===index)" :key="item.id">
        <img class="dish-image" :src="item.img" alt="">
        <span>{{ item.name }}&nbsp;¥{{ item.price }}</span>
        <a-input-number v-show="allowOrder" id="inputNumber" v-model="item.orderCount" :min="0" :max="10"
                        @change="item.orderCount = $event;$emit('updateCurrentOrders',currentOrders)" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMenu } from '@/HeyCafe/api/menu'

export default {
  name: 'Dishes',
  data() {
    return {
      categoriesMap: ['凉菜', '热菜', '主食', '酒水'],
      dishes: []
    }
  },
  props: {
    allowOrder: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    getMenu().then(res => {
      console.log('menu接口返回信息：', res.data)
      this.dishes = res?.data.map(item => Object.assign(item, { orderCount: 0 }))
    })
  },
  computed: {
    currentOrders() {
      return this.dishes.filter(item => item.orderCount > 0).map(item => ({ dishId: item.id, count: item.orderCount }))
    }
  }
}
</script>

<style scoped>
.dish-wrap {
  width: 100px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
}

.dish-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.category-title {
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
}
</style>
