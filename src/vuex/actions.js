import * as types from "./mutation-types";
import {getUser} from '../api/xh_api'
export default {
  
  
  async getUserInfo({commit},user){
    console.log(user);
    let userInfo = await  getUser(user);

    console.log(userInfo);
    commit(types.SAVE_USERINFO,userInfo);
  },

    async getArticleInfo({commit},article){
        console.log(article);
        let articleInfo = await  getArticleInfo(article);

        console.log(articleInfo);
        commit(types.SAVE_ARTICLEINFO,articleInfo);
    }
};
