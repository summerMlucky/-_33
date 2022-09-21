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
/**
 *获取用户信息
 * @param {String} token
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   // Authorization: `Bearer ${store.state.tokenObj.token}`
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}
/**
 *发送短信验证码
 * @param {*} mobile
 * @returns
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}

export const uploadPhotoAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

export const getUserProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

export const UpdateUserProfileAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
/**
 * 关注用户
 * @param {String} target
 * @returns Promise
 */
export const FollowingUserAPI = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消关注用户
 * @param {String} target
 * @returns Promise
 */
export const UnFollowingUserAPI = (target) => {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}
