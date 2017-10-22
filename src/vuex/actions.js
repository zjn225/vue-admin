import * as types from "./mutation-types";
import {getUser,getArticle} from '../api/xh_api'
export default {
  
  
  async getUserInfo({commit},user){
    console.log(user);
    let userInfo = await  getUser(user);

    console.log(userInfo);
    commit(types.SAVE_USERINFO,userInfo);
  },

    async getArticleInfo({commit},article){
        console.log(article);
        let articleInfo = await  getArticle(article);

        console.log(articleInfo.data.data);
        commit(types.SAVE_USERINFO,articleInfo.data.data);
        
    }
};
