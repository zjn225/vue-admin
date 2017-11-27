import * as types from './mutation-types'

export default {

    //储存用户信息
    [types.SAVE_USERINFO](state, userInfo){
        for(let attr in userInfo){
            state.userInfo[attr] = userInfo[attr];
        }
    },
    [types.SAVE_SELECTOPTION](state, selectedOptions){


state.selectedOptions = selectedOptions;
    },
    [types.SAVE_TEAMONE](state, person){

        for(let attr in person){
            state.person[attr] = person[attr];
        }
    },
    [types.SAVE_ARTICLEINFO](state, article){
        for(let attr in article){
            state.article[attr] = article[attr];
        }
        
    },
   
    [types.SAVE_FRIENDLINK](state, friendLink){
        for(let attr in friendLink){
            state.friendLink[attr] = friendLink[attr];
        }
        
    },
}
