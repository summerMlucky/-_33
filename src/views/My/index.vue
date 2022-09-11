<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              style="height: 100%"
              type="flex"
              justify="space-around"
              align="center"
            >
              <van-image round width="1.5rem" height="1.5rem" :src="userInfo.photo"></van-image>
              <span class="mobile">{{userInfo.name}}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              style="height: 100%"
              type="flex"
              justify="center"
              align="center"
            >
              <van-button size="mini" round class="edit_btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{userInfo.art_count}}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{userInfo.fans_count}}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{userInfo.like_count}}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{userInfo.follow_count}}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          :src="mobileSrc"
          width="1.76rem"
          height="1.76rem"
        ></van-image>
        <!-- <img src="@/assets/images/mobile.png"> -->
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block style="color: red" v-if="isLogin" @click="loginout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import mobileSrc from '../../assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'my',
  data() {
    return {
      mobileSrc,
      userInfo: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['tokenObj'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (error) {
        // 1.js导致的
        // 2.axios导致的
        // js和400，507给程序员提示，401给用户提示，重新登录
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    },
    async loginout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f6f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orangered;
  }
}
.banner {
  width: 100%;
  height: 5.3333rem;
  background: url('../../assets/images/banner.png') 0 0 / cover;
  /* background-size: cover; */
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit_btn {
    width: 1.6rem;
    height: 0.426rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
