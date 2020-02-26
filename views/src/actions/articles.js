import axios from 'axios';

let host = ''

if(window.location.href.indexOf('localhost:3000') > -1) {
	host = 'http://localhost:8080'
}

export const getArticles = (page, limit) => async dispatch => {
	let eventSource = new EventSource(`${host}/articles?page=${page}&limit=${limit}`);

	function init(e) {
		dispatch({type: getArticles, payload: JSON.parse(e.data)});

		eventSource.addEventListener('add', function(e) {
			console.log('add', e)
			let data = JSON.parse(e.data)
			if(data.last) {
				dispatch({type: 'pushArticle'});
				return
			}
			dispatch({type: postArticle, payload: JSON.parse(e.data)});
		});

		eventSource.addEventListener('update', function(e) {
			console.log('put', e)
			let data = { data: JSON.parse(e.data) }
			dispatch({type: editArticle, payload: data});
		});

		eventSource.addEventListener('delete', function(e) {
			console.log('del', e)
			let data = JSON.parse(e.data)
			
			data.shift === false  &&	dispatch({type: 'popArticle'})
			data.shift === true && dispatch({type: deleteArticle, payload: data.data });
			data.index && dispatch({type: deleteArticle, payload: {data, index: data.index} });
		});
	}
	
	eventSource.addEventListener('get', init);

	window.addEventListener('beforeunload', function (e) {
		eventSource.close()
	});
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
	console.log('editArticle', article, id, index)
	let params = {
		headers: {
			"Content-Type": "application/json"
		},
		title: article.title, 
		body: article.body,
		index
	}

	const res = await axios.put(`${host}/articles/${id}`, params);
	dispatch({type: editArticle, payload: {
		data: res.data.updated_to,
		index: index
	}});
	return res.data.updated_to
}

export const deleteArticle = (id, index) => async dispatch => {
	await axios.put(`${host}/articles`, { id, index });
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