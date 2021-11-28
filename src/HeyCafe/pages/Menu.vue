<template>
  <div>
    <div class="category-title">凉菜</div>
    <div class="dish-wrap" v-for="item of dishes.filter(item=>item.category===0)" :key="item.id">
      <img class="dish-image" :src="item.img" alt="">
      <span>{{ item.name }}</span>
      <span>¥{{ item.price }}</span>
    </div>
    <div class="category-title">热菜</div>
    <div class="dish-wrap" v-for="item of dishes.filter(item=>item.category===1)" :key="item.id">
      <img class="dish-image" :src="item.img" alt="">
      <span>{{ item.name }}</span>
      <span>¥{{ item.price }}</span>
    </div>
    <div class="category-title">酒水</div>
    <div class="dish-wrap" v-for="item of dishes.filter(item=>item.category===2)" :key="item.id">
      <img class="dish-image" :src="item.img" alt="">
      <span>{{ item.name }}</span>
      <span>¥{{ item.price }}</span>
    </div>
    <div class="category-title">主食</div>
    <div class="dish-wrap" v-for="item of dishes.filter(item=>item.category===3)" :key="item.id">
      <img class="dish-image" :src="item.img" alt="">
      <span>{{ item.name }}</span>
      <span>¥{{ item.price }}</span>
    </div>
  </div>
</template>

<script>
import { getMenu } from '@/HeyCafe/api/menu'

export default {
  name: 'Menu',
  data() {
    return {
      dishes: []
    }
  },
  mounted() {
    getMenu().then(res=>{
      console.log(res.data)
      this.dishes = res?.data
    })
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
