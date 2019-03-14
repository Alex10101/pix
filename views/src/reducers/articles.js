import * as articles from '../actions/articles.js';

export default function ( state = [], action) {

    switch( action.type ) {
        case articles.getArticles:
            return  action.payload || false;

        case articles.getArticle:
            return  action.payload || false;
            
        case articles.postArticle:
            return [...state, { articles : action.payload}] || false;

        case articles.editArticle:
            return [...state, { articles : action.payload}] || false;

        default:
            return state;
    }
}