import axios from 'axios';
// axios.defaults.headers['crossDomain'] = true

export const getArticles = (page, limit) => async dispatch => {
    const res = await axios.get('http://localhost:8080/articles', { page, limit });
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

// export const getArticle = (id) => async dispatch => {
//     const res = await axios.get('http://localhost:8080/articles/', { id });
//     dispatch({type: getArticle, payload: res.data});
// }