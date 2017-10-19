import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

import Safety from './views/nav1/Safety.vue'
import skin from './views/nav1/Skin.vue'
import Main from './views/nav1/Main.vue'

import user from './views/nav2/user.vue'
import Write from './views/nav2/Write.vue'
import writePerson from './views/nav2/writePerson.vue'
import writeArticle from './views/nav2/writeArticle.vue'
import Article from './views/nav2/Article.vue'
import Column from './views/nav2/Column.vue'
import Book from './views/nav2/Book.vue'

import Basic from './views/nav3/Basic.vue'
import friendLink from './views/nav3/friendLink.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '控制台',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            {path: '/main', component: Main, name: '网站概要', hidden: false},
            {path: '/safety', component: Safety, name: '账户安全'},
            {path: '/skin', component: skin, name: '首页外观'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理',
        iconCls: 'el-icon-menu',
        children: [
            {path: '/write', component: Write, name: '撰写文章'},
            {path: '/article', component: Article, name: '文章管理'},
            {path: '/column', component: Column, name: '栏目管理'},
            {path: '/book', component: Book, name: '著作管理'},
            {path: '/user', component: user, name: '专家团队管理'},
            {path: '/writeArticle', component: writeArticle, name: '修改文章'},
            {path: '/writePerson', component: writePerson, name: '修改专家团队'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '站点设置',
        iconCls: 'fa fa-telegram',
        // leaf: true,//只有一个节点
        children: [
            {path: '/basic', component: Basic, name: '基本设置'},
            //机构简介，机构设置
            {path: '/friendLink', component: friendLink, name: '友情链接'}
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;