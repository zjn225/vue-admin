import axios from "axios";
import Qs from 'qs';

let instance = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    withCredentials: true,
 /*   transformRequest: [
        function(data) {
            data = Qs.stringify(data);
            return data;
        }
    ],暂时不加入，否则mock会失效*/
    timeout: 35000
});

/*登录模块*/

export const requestLogin = params => {
    return instance.post(`/login`, params).then(res => res.data);
};

/*文章模块*/

export const getArticleListPage = params => {
    return instance.get(`/tt`, {params: params});
};

export const getArticleList = params => {
    return instance.get(`/user/list`, {params: params});
};

export const removeArticle = params => {
    return instance.get(`/user/remove`, {params: params});
};

export const batchRemoveArticle = params => {
    return instance.get(`/user/batchremove`, {params: params});
};

export const editArticle = params => {
    return instance.get(`/user/edit`, {params: params});
};

/*栏目模块*/
export const getColumnListPage = params => {
    return instance.get(`/tt`, {params: params});
};

export const removeColumn = params => {
    return instance.get(`/user/remove`, {params: params});
};

export const getColumnList = params => {
    return instance.get(`/user/list`, {params: params});
};

export const batchRemoveColumn = params => {
    return instance.get(`/user/batchremove`, {params: params});
};

export const addColumn = params => {
    return instance.get(`/user/add`, {params: params});
};

/*著作模块*/
export const getBookListPage = params => {
    return instance.get(`/tt`, {params: params});
};

export const removeBook = params => {
    return instance.get(`/user/remove`, {params: params});
};

export const getBookList = params => {
    return instance.get(`/user/list`, {params: params});
};

export const batchRemoveBook = params => {
    return instance.get(`/user/batchremove`, {params: params});
};

export const addBook = params => {
    return instance.get(`/user/add`, {params: params});
};


/*用户模块*/
export const getList = params => {
    return instance.get(`/user/list`, {params: params});
};

export const getUserListPage = params => {
    return instance.get(`/user/listpage`, {params: params});
};

export const removeUser = params => {
    return instance.get(`/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return instance.get(`/user/batchremove`, {params: params});
};

export const editUser = params => {
    return instance.get(`/user/edit`, {params: params});
};

export const addUser = params => {
    return instance.get(`/user/add`, {params: params});
};

/*友情链接*/
export const getLinkListPage = params => {
    return instance.get(`/tt`, {params: params});
};

export const removeLink = params => {
    return instance.get(`/user/remove`, {params: params});
};

export const getLinkList = params => {
    return instance.get(`/user/list`, {params: params});
};

export const batchRemoveLink = params => {
    return instance.get(`/user/batchremove`, {params: params});
};

export const addLink = params => {
    return instance.get(`/user/add`, {params: params});
};

