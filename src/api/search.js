import request from '@/utils/request'

/**
 *
 * @param {String} q
 * @returns Promise
 */
export const getSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
* @param {Number} page 页数，不传默认为1
 * @param {Number} per_page 每一页数据的数量
 * @param {String} q 搜索关键字
 * @returns Promise
 */
export const getResultAPI = (page,/* eslint-disable-line*/ per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
