import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
var store = new Vuex.Store({
    state: {
        time: '', //发表时间
        title: '',//标题
        author: '',//作者
        source: '',//文章来源
        selectedOptions: [],  //级联选择器
        isBanner: true,  //是否列为首页banner
        name: 'vuex_name',
        sex: '1',
        age: '',
        addr: '',
        content: '',// 编辑器的内容
    },
    mutations: {
        // person
        changeId(state, msg) {
            state.id = msg;
        },
        changeName(state, msg) {
            state.name = msg;
        },
        changeSex(state, msg) {
            state.sex = msg;
        },
        changeAge(state, msg) {
            state.age = msg;
        },
        changeAddr(state, msg) {
            state.addr = msg;
        },
        changeContent(state, msg) {
            state.content = msg;
        },
        // article
        changeTitle(state, msg) {
            state.title = msg;
        },
        changeAuthor(state, msg) {
            state.author = msg;
        },
        changeTitle(state, msg) {
            state.title = msg;
        },
        changeDate(state, msg) {
            state.date = msg;
        },
        changeType(state, msg) {
            state.type = msg;
        },
        changeSort(state, msg) {
            state.sort = msg;
        },
        changeSource(state, msg) {
            state.source = msg;
        },
        changeIsBanner(state, msg) {
            state.isBanner = msg;
        },
    }
})

// 创建 store 实例
export default store