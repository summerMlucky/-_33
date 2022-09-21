import axios from '@/utils/request'

/**
 * 获取评论或评论回复
 * @param {a或c} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {String} source 源id，文章id或评论id
 * @returns Promise
 */
export const getCommentdAPI = (type, source) => {
  return axios({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}

/**
 * 对文章或者评论进行评论
 * @param {String} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @param {String} artId 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns Promise
 */
export const commentsArticlesAPI = (target, content, artId) => {
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
