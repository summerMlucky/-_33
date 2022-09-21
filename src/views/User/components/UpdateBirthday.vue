<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      value-format="yyyy-MM-dd"
    />
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { UpdateUserProfileAPI } from '@/api'
export default {
  props: ['birthday'],
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(), // 不写具体的时间表示最大为当天
      currentDate: new Date(this.birthday),
      newCurrentDate: ''
    }
  },
  methods: {
    async onConfirm(value, index) {
      this.$parent.$parent.isShowBirthday = false
      this.$toast.success('更新成功')
      this.newCurrentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.$emit('change-birthday', this.newCurrentDate)
      await UpdateUserProfileAPI({ birthday: this.newCurrentDate })
    },
    onCancel() {
      this.$parent.$parent.isShowBirthday = false
    }
  }
}
</script>

<style scoped lang="less"></style>
