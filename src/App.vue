<template>
  <div>
    <!-- 左滑进入 -->
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {}
}
</script>

<style scoped>
.app {
  height: 5rem;
  width: 5rem;
  background-color: pink;
}
</style>
