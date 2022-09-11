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
