import axios from "axios";
import Qs from 'qs';
let ipath = process.env.API_ROOT;

let instance = axios.create({
    baseURL: ipath,
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
    return instance.get(`/data/catalog`, {params: params});
};

export const getArticle = params => {
    return instance.get(`/data/article`, {params: params});
};
export const searchArticle = params => {
    return instance.get(`/data/searchArticle`, {params: params});
};

export const deleteArticle = params => {
    return instance.post(`/data/deletearticle`,params);
};

export const editArticle = params => {
    return instance.post(`/data/editarticle`, params);
};



/*专家团队模块*/
export const getTeamList = params => {
    return instance.get(`/data/team/catalog`, {params: params});
};
export const getTeamOne = params => {
    return instance.get(`/data/team/person`, {params: params});
};

export const addPerson = params => {
    return instance.post(`/data/team/person`, params);
};

export const deletePerson = params => {
    return instance.post(`/data/team/delete`, params);
};
export const editPerson = params => {
    return instance.post(`/data/team/edit`, params);
};
export const reacherPerson = params => {
    return instance.get(`/data/team/reacher`,{params: params});
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

