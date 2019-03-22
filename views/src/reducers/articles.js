import * as actions from '../actions/articles.js';

export default function ( state = [], action) {

    switch( action.type ) {
        case actions.getArticles:
            return  action.payload || false;
            
        case actions.postArticle:
            let data = {...state}
                data.articles.push(action.payload)
            return data;

        case actions.editArticle:
                let i = action.payload.index
                let data2 = {...state}
                data2.articles[i] = action.payload.data
            return data2;

        default:
            return state;
    }
}