import { combineReducers } from 'redux';
import articles from './articles.js';
import editArticle from './editArticle.js';
import setDisplaying from './setDisplaying.js';

export default combineReducers({
	articles,
	edit: editArticle,
	display: setDisplaying
});
