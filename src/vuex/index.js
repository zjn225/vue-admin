import Vuex from "vuex";
import Vue from "vue";

import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const state = {
    // time: '', //发表时间
    // title: '',//标题
    // author: '',//作者
    // source: '',//文章来源
    // selectedOptions: [],  //级联选择器
    // isBanner: true,  //是否列为首页banner
   
    // content: '',// 编辑器的内容
    user:{
        time:''
    },
    person:{
        name: '',
        position: '',
        avatar:'',
        content:'',
    },
    article:{
        title:'',
        author:'',
        source:'',
        time:'',
        content:'',
        isBanner:'',
    },
    books:{
        name:'',
        time:'',
        time:'',
        content:''
    },
    friendLink:{
        id:'',
        name:'',
        link:''
    }
};
export default new Vuex.Store({
    state,
    actions,
    mutations
});
