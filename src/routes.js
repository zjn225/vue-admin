const Main = (resolve) => {
    import('./views/nav1/main.vue').then((module) => {
        resolve(module)
    })
}

const Login = (resolve) => {
    import('./views/Login.vue').then((module) => {
        resolve(module)
    })
}

const NotFound = (resolve) => {
    import('./views/404.vue').then((module) => {
        resolve(module)
    })
}

const Home = (resolve) => {
    import('./views/Home.vue').then((module) => {
        resolve(module)
    })
}

const Safety = (resolve) => {
    import('./views/nav1/Safety.vue').then((module) => {
        resolve(module)
    })
}


const person = (resolve) => {
    import('./views/nav2/person.vue').then((module) => {
        resolve(module)
    })
}
const Write = (resolve) => {
    import('./views/nav2/writeArticle.vue').then((module) => {
        resolve(module)
    })
}
const Brief = (resolve) => {
    import('./views/nav2/brief.vue').then((module) => {
        resolve(module)
    })
}
const editPerson = (resolve) => {
    import('./views/edit/editPerson.vue').then((module) => {
        resolve(module)
    })
}
const editArticle = (resolve) => {
    import('./views/edit/editArticle.vue').then((module) => {
        resolve(module)
    })
}

const Article = (resolve) => {
    import('./views/nav2/Article.vue').then((module) => {
        resolve(module)
    })
}

const addPerson = (resolve) => {
    import('./views/addition/addPerson.vue').then((module) => {
        resolve(module)
    })
}

const Basic = (resolve) => {
    import('./views/nav3/Basic.vue').then((module) => {
        resolve(module)
    })
}
const friendLink = (resolve) => {
    import('./views/nav3/friendLink.vue').then((module) => {
        resolve(module)
    })
}
const addFriendLink = (resolve) => {
    import('./views/addition/addFriendLink.vue').then((module) => {
        resolve(module)
    })
}
const editLink = (resolve) => {
    import('./views/edit/editLink.vue').then((module) => {
        resolve(module)
    })
}

const feedBack = (resolve) => {
    import('./views/nav2/feedBack.vue').then((module) => {
        resolve(module)
    })
}

const brief = (resolve) => {
    import('./views/nav2/brief.vue').then((module) => {
        resolve(module)
    })
}

const direction = (resolve) => {
    import('./views/nav2/direction.vue').then((module) => {
        resolve(module)
    })
}

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
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
            {path: '/main', component: Main, name: '首页'},
            {path: '/safety', component: Safety, name: '账户安全'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理',
        iconCls: 'el-icon-menu',
        children: [
            {path: '/writeArticle', component: Write, name: '撰写文章'},
            {path: '/article', component: Article, name: '文章著作管理'},
            {path: '/person', component: person, name: '专家团队管理'},
            {path: '/feedBack', component: feedBack, name: '反馈管理'},
            {path: '/editArticle', component: editArticle, name: '修改文章'},
            {path: '/editPerson', component: editPerson, name: '修改专家团队'},
            {path: '/brief', component: Brief, name: '修改简介'},
            {path: '/addPerson', component: addPerson, name: '新增专家团队'},
           
            {path: '/addFriendLink', component: addFriendLink, name: '新增友情链接'},
            {path: '/editLink', component: editLink, name: '修改友情链接'},
            {path: '/brief', component: brief, name: '修改简介'},
            {path: '/direction', component: direction, name: '修改研究方向'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '站点设置',
        iconCls: 'fa fa-telegram',
        // leaf: true,//只有一个节点
        children: [
            // {path: '/basic', component: Basic, name: '基本设置'},
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