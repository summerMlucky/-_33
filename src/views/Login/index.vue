<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <!--  -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="modile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            class="btn"
            native-type="button"
            round
            size="small"
            type="default"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="5 * 1000"
            format="ss 秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule.js'
// 引入api
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      modile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async sendCode() {
      // 0.验证用户是否输入了有效的手机号
      // -1 form 绑定ref
      // -$refs.form.validate(name)
      await this.$refs.form.validate('mobile')
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // duration展示时长(ms)，值为 0 时，toast 不会消失
        duration: 0
      })
      try {
        // 1.发送请求
        const { data } = await sendCodeAPI(this.modile)
        console.log(data)
        this.$toast.success('发送验证码成功')
        // 2.显示倒计时组件
        this.isShowCode = false
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          // axios的错误
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    async onSubmit(values) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // duration展示时长(ms)，值为 0 时，toast 不会消失
        duration: 0
      })

      try {
        // 登录
        const { data } = await login(this.modile, this.code)
        // 将token存进vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        // 成功的提示
        this.$toast.success('登陆成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.  js抛的错误  2.axios封装的error对象

        // axios封装的error对象
        // -error.response.data  后端返回数据
        // -error.response.status   后端返回的状态码
        this.$toast.fail('登陆失败')
        console.log(error)
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped样式作用于当前的组件
// vue-cli提供了语法：deep() 深度选择器
.nav-bar {
  background-color: #3196fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
.toutiao {
  font-size: 40px;
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
