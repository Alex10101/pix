import axios from 'axios';

axios.interceptors.response.use(null, error => {
	let once = true
	function one() {
		once = false
		return axios.request(error.config);
	}
	
	if(error.toString().indexOf('Network Error') > -1) {
		if(!once) return false
		setTimeout(one, 2000)
		return
	}

	if(error.config.url.indexOf('/subscribe') > -1) {
		return axios.request(error.config);
	}
});

let host = ''

if(window.location.href.indexOf('localhost:3000') > -1) {
	host = 'http://localhost:8080'
}

export const subscribe = () => async dispatch => {
	let res = await axios.get(`${host}/subscribe`)
	if(!res) return
	dispatch({ type: getArticle, payload: res.data })
}

export const getArticles = (page, limit) => async dispatch => {
	// console.log('getArticles')
  const res = await axios.get(`${host}/articles`, { params: {page, limit }});
  dispatch({type: getArticles, payload: res.data});
}

export const getArticle = (page, limit) => async dispatch => {
		// console.log('getArticle')
    const res = await axios.get(`${host}/article`, { params: { page, limit } });
    dispatch({type: getArticle, payload: res.data});
    return res.data
}

export const postArticle = (article) => async dispatch => {
		// console.log('postArticle')
		let params = {
			headers: {
				"Content-Type": "application/json",
			},
			title: article.title, 
			body: article.body 
		}

    const res = await axios.post(`${host}/articles`, params);
    dispatch({type: postArticle, payload: res.data.created});
}

export const editArticle = (article, id, index) => async dispatch => {
	// console.log('editArticle', article, id, index)
	let params = {
		headers: {
			"Content-Type": "application/json"
		},
		title: article.title, 
		body: article.body 
	}

	const res = await axios.put(`${host}/articles/${id}`, params);
	dispatch({type: editArticle, payload: {
		data: res.data.updated_to,
		index: index
	}});
	return res.data.updated_to
}

export const deleteArticle = (id, index) => async dispatch => {
	const res = await axios.put(`${host}/articles`, { id });
  dispatch({type: deleteArticle, payload: { id, index }});
}

export const setEditable = (article, index) => {
	return ({
		type: setEditable,
		payload: {
			article,
			index
		}
	})
}

export const setDisplaying = (article, index, readonly) => {
	if(readonly) article.editable = false
	if(index) article.index = index
	return ({
		type: setDisplaying,
		payload: article
	})
}