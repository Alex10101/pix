import axios from 'axios';

export const getArticles = (page, limit) => async dispatch => {
    const res = await axios.get('http://localhost:8080/articles', { page, limit });
    dispatch({type: getArticles, payload: res.data});
}

export const getArticle = (id) => async dispatch => {
    const res = await axios.get('http://localhost:8080/articles/', { id });
    dispatch({type: getArticle, payload: res.data});
}

export const postArticle = (item) => async dispatch => {
    const res = await axios.post('http://localhost:8080/articles/', { item });
    dispatch({type: postArticle, payload: res.data});
}

export const editArticle = (id, item) => async dispatch => {
	await axios.put('http://localhost:8080/articles', { id, item });
}