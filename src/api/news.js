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
/**
 * 获取新闻详情
 * @param {Number} article_id
 * @returns Promise
 */
/* eslint-disable */
export const getDetailArticleAPI = (article_id) => {
  return axios({
    url: '/v1_0/articles/' + article_id
  })
}
