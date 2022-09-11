<template>
  <div>
    <article-list
      v-for="item in articlesList"
      :key="item.art_id"
      :article="item"
    ></article-list>
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
      articlesList: []
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
    }
  }
}
</script>

<style></style>
