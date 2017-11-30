import Vuex from "vuex";
import Vue from "vue";

import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const state = {
    loginTime: '',
    loginSite: '',
    loginCip: '',
    user: {
        time: ''
    },
    person: {
        name: '',
        position: '',
        avatar: '',
        content: '',
    },
    expert: {
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
    draft: {
        title: '',
        author: '',
        source: '',
        time: '',
        draftTime :null,
        content: '',
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
    },
    selectedOptions: ["information", "1"]
};
export default new Vuex.Store({
    state,
    actions,
    mutations
});
