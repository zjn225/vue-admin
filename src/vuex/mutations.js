import * as types from './mutation-types'

export default {

  //储存用户信息
  [types.SAVE_USERINFO](state, userInfo){
    for(let attr in userInfo){
      state.userInfo[attr] = userInfo[attr];
    }
  },
    //存储文章信息
    [types.SAVE_ARTICLEINFO](state, articleInfo){
        for(let attr in articleInfo){
            state.articleInfo[attr] = articleInfo[attr];
        }
    },
}
