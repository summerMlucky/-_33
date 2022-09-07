<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count的十倍{{ bigNum }}</h1>
    <button @click="SET_COUNT(100)">点击count++</button>
  </div>
</template>

<script>
// mapState  ---> 将vuex里面的state映射到computed
// 使用
// -引入mapState:函数，返回一个对象
// -参数：['映射的属性']

// mapGetters--->将vuex里面getters映射到computed

// mapMutations--->将vuex里面mutations映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState(['count']))
export default {
  created() {
    console.log(this.$store)
  },
  methods: {
    Add() {
      this.$store.commit('SET_COUNT', 10)
    },
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.app {
  height: 5rem;
  width: 5rem;
  background-color: pink;
}
</style>
