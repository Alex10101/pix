import * as actions from '../actions/articles.js';

let data = ''
let i = ''

export default function ( state = [], action) {
    switch( action.type ) {
        case actions.getArticles:
            return  action.payload || false;
            
        case 'pushArticle':
          data = {...state}
          data.count += 1
          return data;
          
        case 'popArticle':
          data = {...state}
          data.count += -1
          return data;
            
        case actions.postArticle:
          // console.log(state, action.payload)
          // if(!state.length) return data
          data = {...state}
          data.articles.push(action.payload)
          data.count += 1
          return data;

        case actions.editArticle:
                i = action.payload.index
                data = {...state}
                // console.log('state', data)
                if(!data.articles[i]) return data
                data.articles[i] = action.payload.data
            return data;

        case actions.deleteArticle:
          // if not this page 
          // count--
          
          // if(index && id) delete
          // if(!index) check id
                data = {...state}
                data.refresh = true
                data.count += -1
                data.articles.splice([action.payload.index], 1)
                // console.log(data.count)
            return data;

        default:
            return state;
    }
}