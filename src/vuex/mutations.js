import * as types from './mutation-types'

export default {

    //储存用户信息
    [types.SAVE_USERINFO](state, userInfo){
        for(let attr in userInfo){
            state.userInfo[attr] = userInfo[attr];
        }
    },
    [types.SAVE_ARTICLEINFO](state, article){
        console.log(state.article)

        for(let attr in article){
            state.article[attr] = article[attr];
        }
        console.log(state.article)
    },
    [types.SAVE_BOOKINFO](state, book){
        console.log(state.book)

        for(let attr in book){
            state.book[attr] = book[attr];
        }
        console.log(state.book)
    },
}
