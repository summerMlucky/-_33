<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1.输入了第一个字符，决定渲染SearchSuggestion

//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestion'
    }
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      // console.log(reg) //  /A/gi
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
          //  `<span style="color:red">${this.keywords}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        //   this.suggestions = data.data.options.filter((item) => Boolean(item))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败~')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style scoped lang="less"></style>
