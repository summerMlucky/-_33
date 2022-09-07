import request from '@/utils/request'
// user.js划分是跟后端接口文档对应的
/**
 *
 * @param {string} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeAPI = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}
