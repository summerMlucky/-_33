<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="出错了，点击加载更多~"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage: 10,
      results: []
    }
  },
  methods: {
    async getResults() {
      try {
        // if (Math.random() < 0.1) {
        //   throw new Error()
        // }
        const { data } = await getResultAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 54px);
  overflow: overlay;
}
</style>
