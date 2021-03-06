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
let postImg = axios.create({
    baseURL: ipath,
    headers: {
        "Content-Type": "multipart/form-data"
    },
    withCredentials: true,
   
    timeout: 105000
});


/*登录模块*/

export const requestLogin = params => {
    return instance.post(`/user/login`, params).then(res => res.data);
};
export const requestLogOut = () => {
    return instance.get(`/user/logout`).then(res => res.data);
};
export const requestVerCode = params => {
    return instance.get(`/user/resetPassword`, {params: params}).then(res => res.data);
};
export const restPass = params => {
    return instance.post(`/user/resetPassword`, params).then(res => res.data);
};
export const changePass = params => {
    return instance.post(`/user/changePassword`, params).then(res => res.data);
};


/*文章模块*/
export const postArticle = params => {
    return instance.post(`/data/article`,params).then(res => res.data);
};
export const getCatalog = params => {
    return instance.get(`/data/article/catalog`, {params: params});
};

export const getArticle = params => {
    return instance.get(`/data/article`, {params: params});
};
export const searchArticle = params => {
    return instance.get(`/data/article/search`, {params: params});
};

export const deleteArticle = params => {
    return instance.post(`/data/article/delete`,params);
};

export const editArticle = params => {
    return instance.post(`/data/article/edit`, params);
};
export const moveArticle = params => {
    return instance.post(`/data/article/batchMove`, params).then(res => res.data);
};
/*草稿 */
export const getDraft = params => {
    return instance.get(`/data/draft`, {params: params}).then(res => res.data);
};
export const postDraft = params => {
    return instance.post(`/data/draft`,params).then(res => res.data);
};
export const publishDraft = params => {
    return instance.get(`/data/draft/publish`,{params: params}).then(res => res.data);
};
export const updateDraft = params => {
    return instance.post(`/data/draft/update`,params).then(res => res.data);
};
export const getDraftCatalog = params => {
    return instance.get(`/data/draft/catalog`, {params: params}).then(res => res.data);
};

export const deleteDraft = params => {
    return instance.post(`/data/draft/delete`,params).then(res => res.data);
};

export const editDraft = params => {
    return instance.post(`/data/draft/edit`, params).then(res => res.data);
};
export const moveDraft = params => {
    return instance.get(`/data/draft/batchMove`, {params: params}).then(res => res.data);
};

/*研究方向 */
export const getResearchdir = () => {
    return instance.get(`/data/researchdir`).then(res => res.data);
};
export const postResearchdir = params => {
    return instance.post(`/data/researchdir`,params).then(res => res.data);
};

/*研究团队模块*/
export const getPersonList = params => {
    return instance.get(`/data/team/catalog`, {params: params}).then(res => res.data);
};
export const getPerson = params => {
    return instance.get(`/data/team/person`, {params: params});
};

export const addPerson = params => {
    return instance.post(`/data/team/person`, params);
};

export const deletePerson = params => {
    return instance.post(`/data/team/delete`, params);
};
export const editPerson = params => {
    return instance.post(`/data/team/edit`, params).then(res => res.data);
};
export const searchPerson = params => {
    return instance.get(`/data/team/search`,{params: params}).then(res => res.data);
};

/*智库专家模块*/
export const getExpertList = params => {
    return instance.get(`/data/expert/catalog`, {params: params}).then(res => res.data);
};
export const getExpertOne = params => {
    return instance.get(`/data/expert/expert`, {params: params});
};

export const addExpert = params => {
    return instance.post(`/data/expert/expert`, params);
};

export const deleteExpert = params => {
    return instance.post(`/data/expert/delete`, params);
};
export const editExpert = params => {
    return instance.post(`/data/expert/edit`, params).then(res => res.data);
};
export const searchExpert = params => {
    return instance.get(`/data/expert/search`,{params: params}).then(res => res.data);
};

/*友情链接模块*/
export const getLinkList = ( params = 0) => {
    return instance.get(`/data/friendLinks/catalog`,{params: params});
};
export const getLinkOne = (params) => {
    return instance.get(`/data/friendLinks/one`,{params: params});
};
export const addLink = params => {
    return instance.post(`/data/friendLinks/post`, params);
};
export const editLink = params => {
    return instance.post(`/data/friendLinks/edit`, params);
};


export const  deleteLinks = params => {
    return instance.post(`/data/friendLinks/delete`, params);
};

export const  getReadFeedList = params => {
    return instance.get(`/data/feedback/catalog`, {params: params}).then(res => res.data);
};
export const  getFeedOne = params => {
    return instance.get(`/data/feedback/one`, {params: params}).then(res => res.data);
};
export const  deleteFeed = params => {
    return instance.post(`/data/feedback/delete`, params).then(res => res.data);
};



//网站介绍
export const  getIntro = params => {
    return instance.get(`/data/Intro`).then(res => res.data);
};
export const  updateIntro = params => {
    return instance.post(`/data/Intro`, params).then(res => res.data);
};
export const exchangePersonIndex = params => {
    return instance.post(`/data/team/rank`, params).then(res => res.data);
};
export const  updateExpertIndex = params => {
    return instance.post(`/data/expert/rank`, params).then(res => res.data);
};

//研究方向
export const  getDirec = params => {
    return instance.get(`/data/Direc`).then(res => res.data);
};
export const  updateDirec = params => {
    return instance.post(`/data/Direc`, params).then(res => res.data);
};
export const  uploadImg = params => {
    return postImg.post(`/data/article/uploadImg`, params).then(res => res.data);
};

