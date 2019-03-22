import { combineReducers } from 'redux';
import articles from './articles.js';
import editArticle from './editArticle.js';

export default combineReducers({
	articles,
	edit: editArticle
});
