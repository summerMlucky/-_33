import axios from '@/utils/request'

/**
 * 获取频道信息
 * @returns Promise
 */
export const getChannelAPI = () => {
  return axios({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道列表
 * @returns Promise
 */
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels'
  })
}
/**
 *删除指定用户频道
 * @param {String / Number} id
 * @returns
 */
export const delChannelAPI = (id) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
/**
 *
 * @param {String|Number} id
 * @param {Number} seq
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}
