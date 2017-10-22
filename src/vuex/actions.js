import * as types from "./mutation-types";
import {getUser} from '../api/xh_api'
export default {
  
  
  async getUserInfo({commit},user){
    let userInfo = await  getUser(user);

    commit(types.SAVE_USERINFO,userInfo);
  }
};
