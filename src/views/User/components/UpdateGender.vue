<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { UpdateUserProfileAPI } from '@/api'
export default {
  props: ['gender'],
  data() {
    return {
      columns: [{ values: ['男', '女'], defaultIndex: this.gender }]
    }
  },
  methods: {
    async onConfirm(value, index) {
      this.$parent.$parent.isShowGender = false
      this.$toast.success('更新成功')
      this.$emit('change-gender', index)
      await UpdateUserProfileAPI({ gender: index[0] })
    },
    onCancel() {
      this.$parent.$parent.isShowGender = false
    }
  }
}
</script>

<style scoped lang="less"></style>
