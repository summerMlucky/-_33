<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    <!-- 内容 -->
    <div class="article-content">
      <h1 class="article-detail">{{ articleInfo.title }}</h1>
      <div class="user-info">
        <van-image
          round
          width="1.1rem"
          height="1.1rem"
          :src="articleInfo.aut_photo"
        />
        <van-cell :title="articleInfo.aut_name" :label="label">
          <van-button
            icon="plus"
            type="info"
            round
            @click="FollowingUser"
            v-if="!articleInfo.is_followed"
            :loading="loading"
            >关注</van-button
          >
          <van-button
            class="followed"
            type="default"
            :loading="loading"
            round
            icon=""
            v-else
            @click="UnFollowingUser"
            >已关注</van-button
          >
        </van-cell>
      </div>
      <div class="markdown-body">
        <span v-html="articleInfo.content"></span>
      </div>
      <van-divider dashed>正文结束</van-divider>
      <!-- 用户评论 -->
      <user-comment :message="message" ref="comments"> </user-comment>
      <van-divider dashed class="no-more">没有更多了~</van-divider>
    </div>
    <!-- 评论文章弹出层 -->
    <van-popup
      v-model="isShowComments"
      position="bottom"
      :style="{ height: '30%' }"
      v-if="isShowComments"
    >
      <div class="comments">
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          class="publish"
        />
        <van-button
          plain
          type="default"
          :class="{
            publish_btn: message.length !== 0,
            publish_empty_btn: message.length === 0
          }"
          @click="toPublish"
          >发布</van-button
        >
      </div>
    </van-popup>
    <!-- 底部 -->
    <van-cell class="footer">
      <template #title>
        <van-button
          class="comment-btn"
          type="default"
          @click="isShowComments = true"
          >写评论</van-button
        >
      </template>
      <div class="icon">
        <van-badge :content="total_count" max="9">
          <van-icon name="comment-o" />
        </van-badge>
        <van-icon name="star-o" />
        <!-- <van-icon name="star" /> -->
        <van-icon name="good-job-o" />
        <van-icon name="share" />
      </div>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getDetailArticleAPI } from '@/api/index'
import UserComment from './components/UserComment.vue'
import { ImagePreview } from 'vant'
import { commentsArticlesAPI, getCommentdAPI } from '@/api/comments'
import { FollowingUserAPI, UnFollowingUserAPI } from '@/api/user'
export default {
  data() {
    return {
      articleInfo: {},
      isShowComments: false,
      loading: false,
      message: '',
      total_count: ''
    }
  },
  created() {
    this.getDetailArticle()
    this.getCommentd()
  },
  components: {
    UserComment
  },
  computed: {
    label() {
      /* eslint-disable */
      const { pubdate } = this.articleInfo
      return `${dayjs(pubdate).fromNow()}`
    }
  },
  methods: {
    // 关注用户
    async FollowingUser() {
      this.loading = true
      await FollowingUserAPI(this.articleInfo.aut_id)
      this.articleInfo.is_followed = true
      this.loading = false
    },
    // 取消关注用户
    async UnFollowingUser() {
      this.loading = true
      await UnFollowingUserAPI(this.articleInfo.aut_id)
      this.articleInfo.is_followed = false
      this.loading = false
    },
    // 获取评论或评论回复
    async getCommentd() {
      const { data } = await getCommentdAPI('a', this.$route.query.article_id)
      this.total_count = data.data.total_count
      console.log(data)
    },
    // 对文章或者评论进行评论
    async getDetailArticle() {
      const { data } = await getDetailArticleAPI(this.$route.query.article_id)
      this.articleInfo = data.data
      this.$nextTick(() => {
        const main = document.querySelector('.markdown-body')
        const images = main.querySelectorAll('img')
        const newImagesArr = []
        images.forEach((image, index) => {
          newImagesArr.push(image.src)
          // image.onclick = () => {
          //   ImagePreview(newImagesArr)
          // }
          image.addEventListener('click', () => {
            ImagePreview({ images: newImagesArr, startPosition: index })
          })
        })
      })
    },
    async toPublish() {
      this.isShowComments = false
      const { data } = await commentsArticlesAPI(
        this.$route.query.article_id,
        this.message,
        ''
      )
      this.$refs.comments.commentsResults.unshift(data.data.new_obj)
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
// 顶部
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
.followed {
  background-color: #fff;
  color: #000;
}
// 内容
.article-content {
  height: calc(100vh - 46px - 54px);
  overflow: auto;
  .user-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 25px;
    .van-button--normal {
      padding: 0 0.4rem;
      font-size: 0.25333rem;
      height: 60px;
    }
  }
  .article-detail {
    font-size: 0.50333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
    font-weight: bold;
  }
  .no-more {
    margin-bottom: 108px;
  }
}
// 弹出层
.comments {
  display: flex;
  align-items: center;
  .publish {
    width: 80%;
    padding: 15px, 5px;
    background-color: #f5f7f9;
  }
  .publish_btn {
    border-color: #fff;
    color: #3296fa;
  }
  .publish_empty_btn {
    border-color: #fff;
    color: #b5d1ec;
  }
}
// 底部
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  .comment-btn {
    position: relative;
    display: inline-block;
    width: 3.76rem;
    height: 0.61333rem;
    border-radius: 26.64rem;
    border: 0.02667rem solid #eee;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
    padding: 0 0.21333rem;
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .van-icon {
      padding-left: 40px;
      font-size: 0.53333rem;
    }
  }
}
</style>
