<template>
  <div>
    <!-- 评论 -->
    <div v-for="item in commentsResults" :key="item.com_id">
      <div class="user-comment">
        <van-image round width="1.1rem" height="1.1rem" :src="item.aut_photo" />
        <van-cell>
          <template #title>
            <span class="user-name">{{ item.aut_name }}</span>
          </template>
          <template #label>
            <p class="comment-content">
              {{ item.content }}
            </p>
            <div class="foot-item">
              <span class="comment-pubdate">{{
                item.pubdate | formatDate
              }}</span>
              <van-button
                plain
                type="default"
                round
                class="reply-btn"
                @click="getCommentItem(item)"
                >回复 {{ item.reply_count }}</van-button
              >
            </div>
          </template>
          <div :class="{ is_liking: item.is_liking }">
            <van-icon name="good-job-o" />&nbsp;赞
          </div>
        </van-cell>
      </div>
      <!-- 回复评论弹出层 -->
      <van-popup
        v-model="isShowReplyComments"
        position="bottom"
        :style="{ height: '100%' }"
        v-if="isShowReplyComments"
      >
        <!-- 顶部 -->
        <van-nav-bar
          :title="
            item.reply_count == 0 ? '暂无回复' : item.reply_count + '条回复'
          "
          left-arrow
          @click-left="$router.back()"
        />
        <div class="replay_comm">
          <!-- 评论 -->
          <div class="user-comment">
            <van-image
              round
              width="1.1rem"
              height="1.1rem"
              :src="commentsItem.aut_photo"
            />
            <van-cell>
              <template #title>
                <span class="user-name">{{ commentsItem.aut_name }}</span>
              </template>
              <template #label>
                <p class="comment-content">
                  {{ commentsItem.content }}
                </p>
                <div class="foot-item">
                  <span class="comment-pubdate">{{
                    commentsItem.pubdate | formatDate
                  }}</span>
                  <van-button plain type="default" round class="reply-btn"
                    >回复 {{ commentsItem.reply_count }}</van-button
                  >
                </div>
              </template>
              <div :class="{ is_liking: item.is_liking }">
                <van-icon name="good-job-o" />&nbsp;赞
              </div>
            </van-cell>
          </div>
          <van-cell title="全部回复"></van-cell>
          <!-- 回复的评论 -->
          <div v-for="item in commentsReplayResults" :key="item.com_id">
            <div class="user-comment">
              <van-image
                round
                width="1.1rem"
                height="1.1rem"
                :src="item.aut_photo"
              />
              <van-cell>
                <template #title>
                  <span class="user-name">{{ item.aut_name }}</span>
                </template>
                <template #label>
                  <p class="comment-content">
                    {{ item.content }}
                  </p>
                  <div class="foot-item">
                    <span class="comment-pubdate">{{
                      item.pubdate | formatDate
                    }}</span>
                    <van-button plain type="default" round class="reply-btn"
                      >回复 {{ item.reply_count }}</van-button
                    >
                  </div>
                </template>
                <div :class="{ is_liking: item.is_liking }">
                  <van-icon name="good-job-o" />&nbsp;赞
                </div>
              </van-cell>
            </div>
          </div>
          <van-divider dashed class="no-more">没有更多了~</van-divider>
          <van-search
            value="评论"
            shape="round"
            background="#3296fa"
            input-align="center"
            disabled
            left-icon=""
            @click="isShowCommentsComment = true"
            class="reply-comment-btn"
          />
        </div>

        <!-- 回复评论弹出层 -->
        <van-popup
          v-model="isShowCommentsComment"
          position="bottom"
          :style="{ height: '30%' }"
          v-if="isShowCommentsComment"
        >
          <div class="comments">
            <van-field
              v-model="replyMessage"
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
                publish_btn: replyMessage.length !== 0,
                publish_empty_btn: replyMessage.length === 0
              }"
              @click="toReplyPublish"
              >发布</van-button
            >
          </div>
        </van-popup>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getCommentdAPI, commentsArticlesAPI } from '@/api/comments'
import dayjs from '@/utils/dayjs'
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentsResults: [],
      commentsReplayResults: [],
      commentsItem: {},
      isShowReplyComments: false,
      isShowCommentsComment: false,
      replyMessage: '',
      com_id: ''
    }
  },
  created() {
    this.getCommentd()
  },
  filters: {
    formatDate(time) {
      return `${dayjs(time).fromNow()}`
    }
  },
  methods: {
    async getCommentd() {
      const { data } = await getCommentdAPI('a', this.$route.query.article_id)
      this.commentsResults = data.data.results
    },
    async getCommentItem(item) {
      this.isShowReplyComments = true
      this.commentsItem = item
      const { data } = await getCommentdAPI('c', item.com_id)
      this.commentsReplayResults = data.data.results
      this.com_id = item.com_id
    },
    async toReplyPublish() {
      this.isShowCommentsComment = false
      const { data } = await commentsArticlesAPI(
        this.com_id,
        this.replyMessage,
        this.$route.query.article_id
      )
      this.commentsReplayResults.unshift(data.data.new_obj)
      this.$toast.success('评论成功')
      this.replyMessage = ''
      this.commentsResults.forEach((item) => {
        item.reply_count++
      })
    }
  }
}
</script>

<style scoped lang="less">
// 评论回复弹出层顶部
:deep(.van-nav-bar) {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #3296fa;
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-field__control:disabled) {
  color: #323233;
  -webkit-text-fill-color: #323233;
}
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
// 评论
.user-comment {
  display: flex;
  justify-content: space-around;
  padding: 25px;
  padding-top: 100px;
  .van-cell {
    padding: 0 20px 10px 20px;
  }
}
.user-name {
  color: #406599;
  font-size: 0.34667rem;
}
.comment-content {
  font-size: 0.42667rem;
  color: #222;
  word-break: break-all;
  text-align: justify;
}
.foot-item {
  display: flex;
  align-content: center;
  .comment-pubdate {
    font-size: 0.25333rem;
    color: #222;
    margin-right: 0.33333rem;
    margin-top: 7px;
  }
  .reply-btn {
    width: 1.8rem;
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.28rem;
    color: #222;
  }
}
// 回复的评论
.replay_comm {
  height: calc(100vh - 54px - 46px);
  overflow: auto;
}
.reply-comment-btn {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
// 点赞高亮
.is_liking {
  color: #3296fa;
}
</style>
