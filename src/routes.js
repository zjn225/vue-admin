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
const Main = (resolve) => {
    import('./views/nav1/Main.vue').then((module) => {
        resolve(module)
    })
}
const user = (resolve) => {
    import('./views/nav2/user.vue').then((module) => {
        resolve(module)
    })
}
const Write = (resolve) => {
    import('./views/nav2/Write.vue').then((module) => {
        resolve(module)
    })
}

const writePerson = (resolve) => {
    import('./views/nav2/writePerson.vue').then((module) => {
        resolve(module)
    })
}
const editArticle = (resolve) => {
    import('./views/nav2/editArticle.vue').then((module) => {
        resolve(module)
    })
}
const writeBook = (resolve) => {
    import('./views/nav2/writeBook.vue').then((module) => {
        resolve(module)
    })
}
const Article = (resolve) => {
    import('./views/nav2/Article.vue').then((module) => {
        resolve(module)
    })
}
const Book = (resolve) => {
    import('./views/nav2/Book.vue').then((module) => {
        resolve(module)
    })
}
const addPerson = (resolve) => {
    import('./views/nav2/addPerson.vue').then((module) => {
        resolve(module)
    })
}
const addBook = (resolve) => {
    import('./views/nav2/addBook.vue').then((module) => {
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
            {path: '/book', component: Book, name: '著作管理'},
            {path: '/user', component: user, name: '专家团队管理'},
            {path: '/editArticle', component: editArticle, name: '修改文章'},
            {path: '/writePerson', component: writePerson, name: '修改专家团队'},
            {path: '/writeBook', component: writeBook, name: '修改著作'},
            {path: '/addPerson', component: addPerson, name: '新增专家团队'},
            {path: '/addBook', component: addBook, name: '新增著作'},
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