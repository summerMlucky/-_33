<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及文章显示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <article-list :channelId="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isShow"
      position="top"
      :style="{ height: '100%' }"
    >
      <channel-edit
        v-if="isShow"
        :myChannels="channels"
        @change-active=";[(active = $event), (isShow = false)]"
        @del-channel="delchannel"
        @add-channel="addchannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      active: 2,
      channels: [],
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.initChannel()
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNEL']),
    initChannel() {
      if (this.isLogin) {
        // 1.如果登录了
        this.getChannel()
      } else {
        // 2.如果未登录
        const myChannel = this.$store.state.myChannels
        if (myChannel.length !== 0) {
          // -1.本地存储没有数据，channels用本地存储
          this.channels = myChannel
        } else {
          // -2.本地存储有数据，发送请求，获取默认的频道数据
          this.getChannel()
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (error.response && error.response.status === 507) {
          this.$toast.fail('服务端异常，请刷新')
        } else {
          throw error
        }
      }
    },
    async delchannel(id) {
      try {
        // this.channels = this.channels.filter((item) => item.id !== id)
        // await delChannelAPI(id)
        const newChannel = this.channels.filter((item) => item.id !== id)
        if (this.isLogin) {
          // 1.发送请求删除频道
          await delChannelAPI(id)
        } else {
          // 把我的频道存储到本地
          this.SET_MY_CHANNEL(newChannel)
        }

        // 2.视图层删除频道
        this.channels = newChannel
        this.$toast.success('删除频道成功~')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async addchannel(channel) {
      try {
        if (this.isLogin) {
          // 1.发送请求添加频道
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 把我的频道存储到本地
          this.SET_MY_CHANNEL([...this.channels, channel])
        }

        // 2.视图层添加频道
        this.channels.push(channel)
        this.$toast.success('添加频道成功~')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
