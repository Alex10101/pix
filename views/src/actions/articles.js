import axios from 'axios';

export const getArticles = (page, limit) => async dispatch => {
    const res = await axios.get('http://localhost:8080/articles', { params: {page, limit }});
    dispatch({type: getArticles, payload: res.data});
}

export const postArticle = (item) => async dispatch => {
		let params = {
			headers: {
				"Content-Type": "application/json",
			},
			title: item.title, 
			body: item.body 
		}

    const res = await axios.post(`http://localhost:8080/articles`, params);
    dispatch({type: postArticle, payload: res.data});
}

export const editArticle = (id, item) => async dispatch => {
	let params = {
		headers: {
			"Content-Type": "application/json"
		},
		title: item.title, 
		body: item.body 
	}

	const data = await axios.put(`http://localhost:8080/articles/${id}`, params);
}

// Loks pointless if we interact with the articles
// which dosen't changes during the reading time.
// There is rare cases to use it.

// export const getArticle = (id) => async dispatch => {
//     const res = await axios.get('http://localhost:8080/articles/', { id });
//     dispatch({type: getArticle, payload: res.data});
// }