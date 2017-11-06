import Vuex from "vuex";
import Vue from "vue";

import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const state = {
    loginTime: '',
    loginSite:'',
    user: {
        time: ''
    },
    person: {
        name: '',
        position: '',
        avatar: '',
        content: '',
    },
    article: {
        title: '',
        author: '',
        source: '',
        time: '',
        content: '',
        isbanner: '',
        selectedOptions: ''
    },
    books: {
        name: '',
        time: '',
        time: '',
        content: ''
    },
    friendLink: {
        id: '',
        name: '',
        link: ''
    }
};
export default new Vuex.Store({
    state,
    actions,
    mutations
});
