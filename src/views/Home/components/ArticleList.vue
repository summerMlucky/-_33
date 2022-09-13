<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load：触底的时候触发load事件 -->
    <!-- offset：滚动条和底部距离多少的时候触发load事件。默认值是300px -->
    <!-- immediate-check:初渲染的时候是否执行load事件，默认值是true -->
    <!-- v-model = "loading" -->
    <!-- loading为true, load事件不会被触发-->
    <!-- loading为false, load事件会被触发-->
    <!-- loading 会在load事件执行后，被van-list组件自动设置为true,需要手动的该为false-->
    <!-- finished:Boolean  false:load事件会被触发,  true:load事件不会被触发了，并且显示finished-text的文本 -->
    <van-pull-refresh v-model="refreshing" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多文章了~~"
        :error="error"
        error-text="出错了~"
      >
        <article-list
          v-for="item in articlesList"
          :key="item.art_id"
          :article="item"
        ></article-list>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 发送请求， 拿到文章详情数据
import { getArticleAPI } from '@/api'
import ArticleList from './ArticleItem.vue'
export default {
  name: 'Articles',
  data() {
    return {
      articlesList: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    channelId: [String, Number]
  },
  components: {
    ArticleList
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      // new Date().valueof()
      //   Date.now()
      // +new Date()
      try {
        const { data } = await getArticleAPI(this.channelId, +new Date())
        this.articlesList = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，507原封不动上抛，400 上抛中文，
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        /* if (Math.random() < 1) {
          throw new Error()
        } */
        // 1.发送请求
        const { data } = await getArticleAPI(this.channelId, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articlesList.unshift(...data.data.results)
        } else {
          // 2.添加到articlesList
          this.articlesList.push(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句一定会执行
        // 4.更新loading
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &: 代表当前元素他爹
/*   .a{
    $.b{}
    相当于 .a.b{}
  } */
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
