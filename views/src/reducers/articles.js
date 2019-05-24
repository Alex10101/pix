import * as actions from '../actions/articles.js';

let data = ''
let i = ''

export default function ( state = [], action) {
    switch( action.type ) {
        case actions.getArticles:
            return  action.payload || false;

        case actions.getArticle:
            // console.log('actions.getArticle', state, action.payload)
            data = {...state}
            if(!action.payload.length) {
                // console.log('return')
                return data
            }
            data.articles.push(action.payload[0])
            data.refresh = false
            return data || false;
            
        case actions.postArticle:
            data = {...state}
            data.articles.push(action.payload)
            data.count += 1
            return data;

        case actions.editArticle:
                i = action.payload.index
                data = {...state}
                data.articles[i] = action.payload.data
            return data;

        case actions.deleteArticle:
                data = {...state}
                data.refresh = true
                data.count += -1
                data.articles.splice([action.payload.index], 1)
                console.log(data.count)
            return data;

        default:
            return state;
    }
}