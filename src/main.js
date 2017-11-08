import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui'
import {
    Pagination,
    Dialog,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Switch,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Card,
    Rate,
    Collapse,
    CollapseItem,
    Cascader,
    Transfer,
    Container,
    Header,
    Main,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //引入饿了么样式
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

// Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueQuillEditor);

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)

Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

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

