import axios from '@/utils/request'
/**
 * 获取文章新闻推荐
 * @returns Promise
 */
export const getArticleAPI = (channelId, timestamp) => {
  return axios({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
