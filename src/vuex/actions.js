import * as types from "./mutation-types";
import {getUser,getArticle} from '../api/xh_api'
export default {
  
  
  async getUserInfo({commit},user){
    console.log(user);
    let userInfo = await  getUser(user);

    console.log(userInfo);
    commit(types.SAVE_USERINFO,userInfo);
  },
  async getArticle({commit},article){
    let _article = await  getArticle(user);

    console.log(userInfo);
    commit(types.SAVE_ARTICLE,getArticle);
  },
};
