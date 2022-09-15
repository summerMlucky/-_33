<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @focus="isShowResults = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!--  @cancel="$router.back()" -->
    <!-- 搜索历史/建议/搜索结果 -->
    <!-- <search-history></search-history>
    <search-suggestion :keywords="keywords"></search-suggestion>
    <search-result></search-result> -->
    <!-- 动态组件 -->
    <component
      :is="componentName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// class 和style属性的特殊
// -vue自动帮你把class和style合并到组件的根节点上
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
      isShowResults: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  computed: {
    ...mapState(['histories']),
    // 搜索历史：搜索框为空
    // 搜索建议：搜索框有值，并不渲染搜索结果
    // 搜索结果：触发搜索时 显示搜索结果
    // 聚焦时input非空，为搜索结果
    // 聚焦时input空，为搜索建议
    // 失焦时，为搜索历史
    componentName() {
      if (this.keywords === '') {
        return SearchHistory
      }
      // this.keywords一定有值才执行下面
      if (this.isShowResults) {
        return SearchResult
      }
      // 既不渲染搜索结果，又不渲染搜索结果
      return SearchSuggestion
    }
  },
  methods: {
    onSearch(keywords) {
      // 去重：1.获取没有去重的数组
      // 2.放在new Set(arr)
      // 3.[...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      // this.histories.push(keywords)
      this.$store.commit('SET_HISTORIES', distinctHistories)
      this.isShowResults = true
      this.keywords = keywords
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
