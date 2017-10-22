import axios from "axios";
import Qs from 'qs';

let instance = axios.create({
    baseURL: ' http://localhost:3000/admin',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    withCredentials: true,
    transformRequest: [
        function(data) {
            data = Qs.stringify(data);
            return data;
        }
    ],
    timeout: 35000
});

/*登录模块*/

export const requestLogin = params => {
    return instance.post(`/user/login`, params).then(res => res.data);
};


/*文章模块*/
export const postArticle = params => {
    return instance.post(`/data/article`,params);
};
export const getCatalog = params => {
    console.log("sss")
    return instance.get(`/data/catalog`, {params: params});
};

export const getArticle = params => {
    return instance.get(`/data/article`, {params: params});
};


export const deleteArticle = params => {
    return instance.post(`/data/deletearticle`,params);
};



export const editArticle = params => {
    return instance.patch(`/data/article`, {params: params});
};


/*专家模块*/
export const getUserCatalog = params => {
    return instance.get(`/data/teamall`, params).then(res => res.data);
};
export const getUser = params => {
    return instance.get(`/article/getUser`, {params}).then(res => res.data);
};
/*栏目模块*/
export const getColumnListPage = params => {
    return axios.get(`/tt`, {params: params});
};

export const removeColumn = params => {
    return axios.get(`/user/remove`, {params: params});
};

export const getColumnList = params => {
    return axios.get(`/user/list`, {params: params});
};

export const batchRemoveColumn = params => {
    return axios.get(`/user/batchremove`, {params: params});
};

export const addColumn = params => {
    return axios.get(`/user/add`, {params: params});
};

/*著作模块*/
export const getBookListPage = params => {
    return axios.get(`/tt`, {params: params});
};

export const removeBook = params => {
    return axios.get(`/user/remove`, {params: params});
};

export const getBookList = params => {
    return axios.get(`/user/list`, {params: params});
};

export const batchRemoveBook = params => {
    return axios.get(`/user/batchremove`, {params: params});
};

export const addBook = params => {
    return axios.get(`/user/add`, {params: params});
};


/*用户模块*/
export const getList = params => {
    return axios.get(`/user/list`, {params: params});
};

export const getUserListPage = params => {
    return axios.get(`/user/listpage`, {params: params});
};

export const removeUser = params => {
    return axios.get(`/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.get(`/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.get(`/user/add`, {params: params});
};

/*友情链接*/
export const getLinkListPage = params => {
    return axios.get(`/tt`, {params: params});
};

export const removeLink = params => {
    return axios.get(`/user/remove`, {params: params});
};

export const getLinkList = params => {
    return axios.get(`/user/list`, {params: params});
};

export const batchRemoveLink = params => {
    return axios.get(`/user/batchremove`, {params: params});
};

export const addLink = params => {
    return axios.get(`/user/add`, {params: params});
};

