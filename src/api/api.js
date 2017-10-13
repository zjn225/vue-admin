import axios from "axios";

let base = '';

/*var instance = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
});*/

/*登录模块*/

export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};

/*文章模块*/

export const getArticleListPage = params => {
    return axios.get(`${base}/login`, {params: params});
};

export const getArticleList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const removeArticle = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveArticle = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editArticle = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};

/*栏目模块*/
export const getColumnListPage = params => {
    return axios.get(`${base}/login`, {params: params});
};

export const removeColumn = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const getColumnList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const batchRemoveColumn = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const addColumn = params => {
    return axios.get(`${base}/user/add`, {params: params});
};

/*著作模块*/
export const getBookListPage = params => {
    return axios.get(`${base}/login`, {params: params});
};

export const removeBook = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const getBookList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const batchRemoveBook = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const addBook = params => {
    return axios.get(`${base}/user/add`, {params: params});
};


/*用户模块*/
export const getList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, {params: params});
};

/*友情链接*/
export const getLinkListPage = params => {
    return axios.get(`${base}/login`, {params: params});
};

export const removeLink = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const getLinkList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const batchRemoveLink = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const addLink = params => {
    return axios.get(`${base}/user/add`, {params: params});
};

