import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'  //引入饿了么样式
import 'font-awesome/css/font-awesome.min.css'  //引入font-awesome样式
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
// import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Mock from './mock'
import VueQuillEditor from "vue-quill-editor"
import store from './vuex/index'

Vue.config.productionTip = false

Mock.bootstrap();  //初始化mock

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueQuillEditor);

const router = new VueRouter({
    routes
})

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    //手动进入这个login
    if (to.path === '/login') {
        sessionStorage.removeItem('user');
    }
    let status = JSON.parse(sessionStorage.getItem('status'));
    //sessionStorage不存在状态码且即将进入的路由对象不是login
    if (!status && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next();//进行管道中的下一个钩子
    }
})

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')

