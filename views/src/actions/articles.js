import axios from 'axios';

export const getArticles = (page, limit) => async dispatch => {
    const res = await axios.get('http://localhost:8080/articles', { params: {page, limit }});
    dispatch({type: getArticles, payload: res.data});
}

export async function getArticle(id) {
		console.log('getArticle')
    const res = await axios.get(`http://localhost:8080/articles/${id}`,);
    return res.data
}

export const postArticle = (article) => async dispatch => {
		console.log('postArticle')
		let params = {
			headers: {
				"Content-Type": "application/json",
			},
			title: article.title, 
			body: article.body 
		}

    const res = await axios.post(`http://localhost:8080/articles`, params);
    dispatch({type: postArticle, payload: res.data.created});
}

export const editArticle = (article, id, index) => async dispatch => {
	console.log('editArticle', article, id, index)
	let params = {
		headers: {
			"Content-Type": "application/json"
		},
		title: article.title, 
		body: article.body 
	}

	const res = await axios.put(`http://localhost:8080/articles/${id}`, params);
	dispatch({type: editArticle, payload: {
		data: res.data.updated_to,
		index: index
	}});
	return res.data.updated_to
}

export const setVisible = (article, index) => {
	return ({
		type: setVisible,
		payload: {
			article,
			index
		}
	})
}