<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="cancel"
      @click-right="confirm"
    />
    <form action="/">
      <textarea
        name="更新昵称"
        id=""
        cols="30"
        rows="5"
        class="van-field__control"
        v-model="nickName"
        maxlength="7"
        show-word-limit
      ></textarea>
      <div class="van-field__word-limit">
        <span class="van-field__word-num">{{ nickName.length }}</span
        >/7
      </div>
    </form>
  </div>
</template>

<script>
import { UpdateUserProfileAPI } from '@/api'
export default {
  data() {
    return {
      nickName: this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    cancel() {
      this.$parent.$parent.isShowNickname = false
    },
    async confirm() {
      this.$parent.$parent.isShowNickname = false
      this.$emit('change-nickname', this.nickName)
      this.$toast.success('更新成功')
      await UpdateUserProfileAPI({ name: this.nickName })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-field__control) {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
.van-field__word-limit {
  margin-top: 0.10667rem;
  color: #646566;
  font-size: 0.32rem;
  line-height: 0.42667rem;
  text-align: right;
}
textarea {
  font-size: 0.32rem;
}
</style>
